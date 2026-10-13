import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Code manquant ou invalide' }, { status: 400 });
    }

    const issues: Array<{ type: string; message: string; severity: 'high' | 'medium' | 'low' }> = [];
    let score = 100;

    // Analyse basique des anti-patterns ServiceNow courants
    if (code.includes('while') && code.includes('GlideRecord') && (code.includes('insert') || code.includes('update') || code.includes('delete'))) {
      issues.push({
        type: 'Anti-pattern Performance',
        message: 'Utilisation potentielle de modifications de données (insert/update) à l’intérieur d’une boucle GlideRecord. Préférez l’utilisation de coalesce ou d’un tableau d’IDs.',
        severity: 'high'
      });
      score -= 30;
    }

    if (code.includes('gr.query()') && !code.includes('addQuery') && !code.includes('addActiveQuery')) {
      issues.push({
        type: 'Sécurité / Volumétrie',
        message: 'Requête GlideRecord globale sans filtre (`addQuery`). Risque majeur de performance sur les grandes tables.',
        severity: 'high'
      });
      score -= 25;
    }

    if (!code.includes('gs.info') && !code.includes('gs.error') && !code.includes('gs.warn') && !code.includes('gs.log')) {
      issues.push({
        type: 'Bonne Pratique (Logging)',
        message: 'Aucun mécanisme de journalisation (gs.info / gs.error) détecté pour le suivi et le debugging.',
        severity: 'low'
      });
      score -= 10;
    }

    if (code.includes('current.update()') && code.includes('Business Rule')) {
      issues.push({
        type: 'Anti-pattern Récursion',
        message: 'Appel de `current.update()` dans une Business Rule (sauf avant-insert/update), risque de boucle infinie.',
        severity: 'high'
      });
      score -= 35;
    }

    const finalScore = Math.max(0, score);

    return NextResponse.json({
      success: true,
      score: finalScore,
      issues,
      summary: finalScore >= 80 
        ? 'Excellent code, respecte globalement les normes ServiceNow.' 
        : finalScore >= 50 
        ? 'Code acceptable mais nécessite des optimisations de performance ou de sécurité.' 
        : 'Attention : Plusieurs anti-patterns critiques ont été détectés.'
    });

  } catch (error) {
    console.error("Erreur lors de l'audit du code :", error);
    return NextResponse.json({ error: 'Erreur serveur lors de l’analyse' }, { status: 500 });
  }
}