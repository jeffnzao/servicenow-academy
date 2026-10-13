'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, AlertTriangle, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface AuditResult {
  score: number;
  summary: string;
  issues: Array<{
    type: string;
    message: string;
    severity: 'high' | 'medium' | 'low';
  }>;
}

export default function CodeReviewPage() {
  const [code, setCode] = useState(`// Collez votre script ServiceNow ici (ex: Script Include, Business Rule)\nvar myGr = new GlideRecord('incident');\nmyGr.query();\nwhile(myGr.next()) {\n   // Votre logique...\n}`);
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const handleAuditCode = async () => {
    setLoading(true);
    setAuditResult(null);

    try {
      const res = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        const data = await res.json();
        setAuditResult(data);
      }
    } catch (err) {
      console.error("Erreur lors de l'appel à l'API d'audit", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          <span>Retour à l'accueil</span>
        </Link>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Outil Avancé</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Console d'Audit & Review de Code ServiceNow</h1>
          <p className="text-gray-400 text-sm mt-1">Analysez automatiquement vos scripts pour détecter les anti-patterns, les failles de performance et les risques de récursion.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Éditeur de code source */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Cpu size={14} className="text-purple-400" /> Script à auditer
              </span>
              <button
                onClick={handleAuditCode}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-purple-600/20 flex items-center space-x-1.5 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>{loading ? 'Analyse en cours...' : 'Lancer l’Audit'}</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              className="w-full bg-[#0d1117] text-gray-200 font-mono text-xs p-4 rounded-xl border border-gray-800 focus:outline-none focus:border-purple-500 transition resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Rapport d'Audit */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">Rapport d'Analyse</h2>

              {auditResult ? (
                <div className="space-y-6">
                  {/* Score global */}
                  <div className="flex items-center justify-between bg-[#0d1117] p-4 rounded-xl border border-gray-800">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Score de Qualité</p>
                      <p className="text-sm text-gray-300 mt-0.5">{auditResult.summary}</p>
                    </div>
                    <div className={`text-2xl font-extrabold px-4 py-2 rounded-xl border ${
                      auditResult.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      auditResult.score >= 50 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {auditResult.score}/100
                    </div>
                  </div>

                  {/* Liste des anomalies */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Anomalies détectées ({auditResult.issues.length})</p>
                    {auditResult.issues.length > 0 ? (
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                        {auditResult.issues.map((issue, idx) => (
                          <div key={idx} className="p-3 bg-[#0d1117] border border-gray-800 rounded-xl space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                                <AlertTriangle size={12} /> {issue.type}
                              </span>
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded">
                                {issue.severity}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300">{issue.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center space-x-3 text-xs">
                        <CheckCircle size={18} />
                        <span>Aucun anti-pattern critique détecté. Excellent travail !</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500 space-y-2 border border-dashed border-gray-800 rounded-xl p-6">
                  <ShieldAlert className="w-10 h-10 text-gray-600" />
                  <p className="text-xs">Collez votre code à gauche et cliquez sur "Lancer l'Audit" pour générer le rapport d'analyse.</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
              <span>ServiceNow Code Review Engine v1.0</span>
              <Link href="/dashboard" className="text-purple-400 hover:underline">Voir le Dashboard →</Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}