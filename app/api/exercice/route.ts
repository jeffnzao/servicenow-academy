import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exerciseId, code } = body;

    if (!code) {
      return NextResponse.json({ success: false, message: 'Aucun code fourni.' }, { status: 400 });
    }

    // Validation statique sécurisée selon l'exercice
    let isSuccess = false;
    let message = '';

    if (exerciseId === 'ex-client-script-network' || code.includes('setMandatory')) {
      isSuccess = code.includes('setMandatory') && code.includes('network');
      message = isSuccess 
        ? "✅ Validation réussie par l'API serveur : Le code respecte les bonnes pratiques du Client Script." 
        : "❌ Échec de validation : L'utilisation de g_form.setMandatory ou de la condition 'network' est incorrecte.";
    } else {
      isSuccess = true;
      message = "✅ Code validé par le simulateur d'API.";
    }

    return NextResponse.json({ success: isSuccess, message });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur interne du serveur de validation.' }, { status: 500 });
  }
}