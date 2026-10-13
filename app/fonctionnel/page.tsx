'use client';

import Link from 'next/link';
import { Layers, ArrowLeft, Play, BookOpen } from 'lucide-react';

export default function FonctionnelCataloguePage() {
  const fonctionnelModules = [
    {
      id: 'create-reports',
      slug: 'create-my-own-reports',
      title: 'Create My Own Reports & Dashboards',
      category: 'Reporting',
      level: 'Débutant',
      duration: '25 min',
      description: 'Apprenez à structurer des rapports, choisir les types de visualisations et partager des tableaux de bord exécutifs.'
    },
    {
      id: 'form-templates',
      slug: 'create-form-templates',
      title: 'Create Form Templates & Sharing',
      category: 'Administration',
      level: 'Intermédiaire',
      duration: '30 min',
      description: 'Optimisez la saisie des agents du Service Desk en créant et partageant des modèles de formulaires.'
    },
    {
      id: 'knowledge-base',
      slug: 'manage-knowledge-base',
      title: 'Manage Knowledge Base and Create Articles',
      category: 'Knowledge',
      level: 'Intermédiaire',
      duration: '35 min',
      description: 'Gestion des rôles, intégration de documents Word, validation, publication et application des critères utilisateurs (User Criteria).'
    },
    {
      id: 'quick-messages',
      slug: 'enable-quick-messages',
      title: 'Enable Quick Messages & Templates',
      category: 'Collaboration',
      level: 'Débutant',
      duration: '20 min',
      description: 'Accélérez la communication client via les messages rapides intégrés au client e-mail de la plateforme.'
    },
    {
      id: 'hr-case-mgmt',
      slug: 'explore-hr-case-management',
      title: 'Explore HR Case Management & Content',
      category: 'HR Service Delivery',
      level: 'Avancé',
      duration: '40 min',
      description: 'Configuration du module HRSD, taxonomie, gestion des cas RH et publication de contenu sur l’Employee Center Portal.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          <span>Retour à l'accueil</span>
        </Link>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Parcours Fonctionnel</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Modules Métiers & Configuration ServiceNow</h1>
          <p className="text-gray-400 text-sm mt-1">Explore les ateliers de configuration fonctionnelle : gestion des connaissances, formulaires, templates et modules RH.</p>
        </div>

        <div className="space-y-4">
          {fonctionnelModules.map((mod, index) => (
            <div
              key={mod.id}
              className="bg-[#111827] border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {mod.category}
                  </span>
                  <span className="text-xs text-gray-400">Niveau : {mod.level}</span>
                  <span className="text-xs text-gray-500">Durée : {mod.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{index + 1}. {mod.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{mod.description}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto justify-end">
                <Link
                  href={`/fonctionnel/${mod.slug}`}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <BookOpen size={14} />
                  <span>Explorer le module</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}