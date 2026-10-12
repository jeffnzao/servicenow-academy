'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle, Terminal, Play, User, ExternalLink, Server, Clock, Globe } from 'lucide-react';

export default function Home() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [code, setCode] = useState("function onChange(control, oldValue, newValue, isLoading, isTemplate) {\n  if (isLoading || newValue === '') {\n    return;\n  }\n\n  // À toi de jouer : rends cmdb_ci obligatoire pour la catégorie 'network'\n}");
  const [testResult, setTestResult] = useState<string | null>(null);

  const lessons = [
    { id: 1, title: "Client ou serveur : où s’exécute ton code ?", duration: "20 min", category: "Fondamentaux" },
    { id: 2, title: "GlideRecord : interroger la base proprement", duration: "25 min", category: "Fondamentaux" },
    { id: 3, title: "Anatomie d’un Script Include : public et privé", duration: "30 min", category: "Fondamentaux" },
    { id: 4, title: "Script Include appelable côté client : GlideAjax", duration: "30 min", category: "Fondamentaux" },
    { id: 5, title: "Business Rules : intercepter et modifier les données", duration: "35 min", category: "Serveur Avancé" },
    { id: 6, title: "Scheduled Jobs : automatiser dans le temps", duration: "25 min", category: "Serveur Avancé" },
    { id: 7, title: "Scripted REST APIs : recevoir et envoyer de la donnée", duration: "40 min", category: "Intégration" },
  ];

  const runTests = () => {
    if (code.includes('setMandatory') && code.includes('network')) {
      setTestResult("✅ Succès ! Le test du simulateur ServiceNow a validé ton script.");
    } else {
      setTestResult("❌ Échec : Vérifie l'utilisation de g_form.setMandatory pour la catégorie 'network'.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-gray-800 bg-[#111827] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Exams Viewer
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 border border-blue-700">Certification Training</span>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-1 text-yellow-400 font-medium">
            <span>🔥 26</span>
          </div>
          <div className="flex items-center space-x-1 text-blue-400 font-medium">
            <BookOpen size={16} />
            <span>Learn</span>
          </div>
          <div className="flex items-center space-x-2 border-l border-gray-700 pl-4">
            <User size={16} className="text-gray-300" />
            <span className="text-gray-200">Jeff Warren</span>
          </div>
        </div>
      </header>

      {/* Main Content layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar / Plan du cours */}
        <aside className="lg:col-span-1 bg-[#111827] border border-gray-800 rounded-xl p-5 h-fit space-y-6">
          <div>
            <h2 className="font-semibold text-white mb-1">Programme ServiceNow</h2>
            <p className="text-xs text-gray-400">7 leçons • 205 min de formation</p>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson.id)}
                className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-center justify-between ${
                  currentLesson === lesson.id 
                    ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300 font-medium' 
                    : 'hover:bg-gray-800/60 text-gray-400'
                }`}
              >
                <div>
                  <span className="text-[10px] text-gray-500 block mb-0.5">Leçon {lesson.id} • {lesson.category}</span>
                  {lesson.title}
                </div>
              </button>
            ))}
          </div>

          {/* Call to action PDI */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-blue-950/40 border border-indigo-800/50 rounded-lg p-4 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-indigo-300 font-semibold">
              <Server size={16} />
              <span>Votre Instance PDI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Pour une expérience réelle, applique ces scripts directement sur ta Personal Developer Instance ServiceNow.
            </p>
            <a
              href="https://developer.servicenow.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-medium pt-1"
            >
              <span>Ouvrir Developer Portal</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </aside>

        {/* Lesson View & Editor */}
        <main className="lg:col-span-3 space-y-6">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Leçon {currentLesson} sur 7
            </span>
            <h1 className="text-2xl font-bold text-white mt-1 mb-3">
              {lessons[currentLesson - 1].title}
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {currentLesson <= 4 
                ? "Maîtrisez les fondamentaux du scripting client et serveur, la structure des classes et la communication asynchrone sécurisée."
                : currentLesson === 5
                ? "Interceptez les opérations de base de données (Insert, Update, Delete) avec les Business Rules avant/après et exploitez les objets current et previous."
                : currentLesson === 6
                ? "Automatisez vos traitements en arrière-plan à intervalles réguliers grâce aux Scheduled Jobs et aux scripts planifiés."
                : "Exposez vos propres endpoints REST personnalisés et consommez des API tierces de manière robuste avec RESTMessageV2."}
            </p>

            {/* Interactive Code Simulator box */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden mt-6">
              <div className="bg-[#161b22] px-4 py-2 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center space-x-2">
                  <Terminal size={14} className="text-blue-400" />
                  <span>
                    {currentLesson <= 4 ? 'client_script.js · Client Script' : currentLesson === 5 ? 'business_rule.js · Before Insert/Update' : currentLesson === 6 ? 'scheduled_job.js · System Scheduler' : 'scripted_rest.js · REST API Script'}
                  </span>
                </span>
                <span>JavaScript</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 bg-transparent p-4 text-sm font-mono text-gray-200 resize-none focus:outline-none"
                spellCheck={false}
              />
              <div className="bg-[#161b22] px-4 py-3 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500">S’exécute dans un simulateur ServiceNow local.</span>
                <button
                  onClick={runTests}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Play size={14} />
                  <span>Lancer les tests (Ctrl + Entrée)</span>
                </button>
              </div>
            </div>

            {/* Test Results */}
            {testResult && (
              <div className={`mt-4 p-4 rounded-lg text-sm border ${testResult.startsWith('✅') ? 'bg-green-950/40 border-green-800 text-green-300' : 'bg-red-950/40 border-red-800 text-red-300'}`}>
                {testResult}
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}