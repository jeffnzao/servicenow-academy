'use client';

import { Check, X, AlertTriangle } from 'lucide-react';

export default function DecisionMatrixTable() {
  const options = [
    {
      tech: 'Table API',
      type: 'Entrante (Inbound)',
      useCase: 'CRUD simple direct sur une table',
      complexity: 'Faible',
      performance: 'Moyenne (requêtes unitaires)',
      lowCode: true
    },
    {
      tech: 'Scripted REST API',
      type: 'Entrante (Inbound)',
      useCase: 'Contrat d’API sur-mesure, agrégation de tables',
      complexity: 'Élevée (JavaScript)',
      performance: 'Élevée (contrôlée par le code)',
      lowCode: false
    },
    {
      tech: 'Import Set API',
      type: 'Entrante (Inbound)',
      useCase: 'Volumétrie élevée (bulk), staging & transformation',
      complexity: 'Moyenne',
      performance: 'Excellente (traitement asynchrone)',
      lowCode: true
    },
    {
      tech: 'RESTMessageV2',
      type: 'Sortante (Outbound)',
      useCase: 'Appel d’un Web Service tiers sur-mesure via script',
      complexity: 'Moyenne / Élevée',
      performance: 'Élevée',
      lowCode: false
    },
    {
      tech: 'IntegrationHub / Flow',
      type: 'Bi-directionnelle',
      useCase: 'Workflows d’automatisation inter-applicatifs',
      complexity: 'Faible à Moyenne',
      performance: 'Excellente',
      lowCode: true
    }
  ];

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-xl my-6">
      <div className="p-5 border-b border-gray-800 bg-[#161b22]">
        <h3 className="text-base font-bold text-white">Matrice Comparative des Intégrations ServiceNow</h3>
        <p className="text-xs text-gray-400 mt-1">Guide d'arbitrage pour les architectes de la plateforme.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-[#0d1117] text-gray-400 font-mono uppercase text-[10px] tracking-wider border-b border-gray-800">
            <tr>
              <th className="p-4">Technologie</th>
              <th className="p-4">Direction</th>
              <th className="p-4">Cas d'usage recommandé</th>
              <th className="p-4">Complexité</th>
              <th className="p-4">Performance / Volumétrie</th>
              <th className="p-4">Low-Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 font-sans">
            {options.map((opt, i) => (
              <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                <td className="p-4 font-bold text-white font-mono">{opt.tech}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px]">
                    {opt.type}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{opt.useCase}</td>
                <td className="p-4 font-medium text-yellow-400">{opt.complexity}</td>
                <td className="p-4 text-gray-300">{opt.performance}</td>
                <td className="p-4">
                  {opt.lowCode ? (
                    <span className="inline-flex items-center space-x-1 text-green-400 font-semibold">
                      <Check size={14} /> <span>Oui</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-gray-500">
                      <X size={14} /> <span>Code</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}