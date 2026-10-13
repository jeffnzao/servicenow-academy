'use client';

import Link from 'next/link';
import { Cpu, Layers, ExternalLink, Server, ArrowRight } from 'lucide-react';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans">
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-700/50">
            Exams Viewer • Certification Training
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Plateforme de Formation & Certification ServiceNow
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Choisis ton parcours d'apprentissage, réalise les exercices pratiques en conditions réelles et teste tes compétences sur ta PDI.
          </p>
        </div>

        {/* Indicateurs / Tableau de bord */}
        <DashboardMetrics />

        {/* Choix des 2 Parcours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Parcours Technique */}
          <Link href="/technique" className="group bg-[#111827] border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu size={24} />
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Parcours Technique & Scripting
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Maîtrise le code ServiceNow : Client Scripts, GlideRecord, Script Includes, GlideAjax, Business Rules, Scripted REST APIs et Fix Scripts.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-blue-400 text-sm font-semibold pt-4">
              <span>Accéder aux exercices techniques</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Parcours Fonctionnel */}
          <Link href="/fonctionnel" className="group bg-[#111827] border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-8 transition-all space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Layers size={24} />
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                Parcours Fonctionnel & Métier
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Configure les modules métiers : Rapports, Templates, Knowledge Base, Quick Messages, HR Case Management et Employee Center Portal.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-indigo-400 text-sm font-semibold pt-4">
              <span>Accéder aux modules fonctionnels</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

        {/* PDI Banner */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-blue-950/30 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <Server size={28} className="text-indigo-400" />
            <div>
              <h3 className="font-semibold text-white text-sm">Besoin d'une instance pour tester ?</h3>
              <p className="text-xs text-gray-400">Ouvre ta Personal Developer Instance ServiceNow pour valider les TP.</p>
            </div>
          </div>
          <a
            href="https://developer.servicenow.com"
            target="_blank"
            rel="noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-1 shrink-0 shadow-md"
          >
            <span>Ouvrir Developer Portal</span>
            <ExternalLink size={12} />
          </a>
        </div>

      </main>
    </div>
  );
}