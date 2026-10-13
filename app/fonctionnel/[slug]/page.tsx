'use client';

import { use, Suspense } from 'react';
import Link from 'next/link';
import { FUNCTIONAL_MODULES_DATA } from '@/data/fonctionnel/functional-data';
import { ArrowLeft, Layers, CheckCircle, Briefcase } from 'lucide-react';

function FonctionnelContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const moduleData = FUNCTIONAL_MODULES_DATA.find((m) => m.slug === resolvedParams.slug) || FUNCTIONAL_MODULES_DATA[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/fonctionnel" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} />
        <span>Retour au catalogue fonctionnel</span>
      </Link>

      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs px-3 py-1 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-700">{moduleData.category}</span>
          <span className="text-xs text-yellow-400">Niveau : {moduleData.level}</span>
          <span className="text-xs text-gray-400">Durée : {moduleData.duration}</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-white">{moduleData.title}</h1>
        <p className="text-gray-300 text-sm leading-relaxed">{moduleData.description}</p>
      </div>

      {/* Besoin Métier */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Briefcase size={18} className="text-indigo-400" />
          <span>Problématique ou Besoin Métier</span>
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed bg-[#0d1117] p-4 rounded-xl border border-gray-800">
          {moduleData.businessNeed}
        </p>
      </div>

      {/* Étapes de Réalisation PDI */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <CheckCircle size={18} className="text-indigo-400" />
          <span>Étapes de Configuration sur PDI</span>
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300 bg-[#0d1117] p-5 rounded-xl border border-gray-800">
          {moduleData.pdiSteps.map((step, index) => (
            <li key={index} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function FonctionnelCourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans p-6 md:p-12">
      <Suspense fallback={<div className="text-center text-gray-400 py-12">Chargement du module fonctionnel...</div>}>
        <FonctionnelContent params={params} />
      </Suspense>
    </div>
  );
}