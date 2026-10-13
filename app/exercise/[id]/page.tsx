'use client';

import { useState, Suspense, use } from 'react';
import Link from 'next/link';
import { EXERCISES_DATA } from '@/lib/course-registry';
import { ArrowLeft, Terminal, Play, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import ExerciseChecklist from '@/components/exercises/ExerciseChecklist';
import { saveExerciseProgress } from '@/lib/progress';

function ExerciseContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const exercise = EXERCISES_DATA.find((e) => e.id === resolvedParams.id) || EXERCISES_DATA[0];

  const [code, setCode] = useState(exercise.initialCode || '');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'pdi'>('instructions');

  const runCodeTests = () => {
  // 1. Évaluation de la condition de réussite
  const isSuccess = 
    code.includes('setMandatory') || 
    code.includes('GlideAggregate') || 
    code.includes('sn_ws') ||
    code.includes('setValue');

  if (isSuccess) {
    // 2. Sauvegarde de la progression et ajout de +25 XP
    saveExerciseProgress(exercise.id);

    setTestResult({
      success: true,
      message: "✅ Validation réussie ! +25 XP accordés. Vos progrès ont été enregistrés."
    });
  } else {
    setTestResult({
      success: false,
      message: "❌ Échec de validation : Vérifiez les méthodes utilisées selon les consignes de l'exercice."
    });
  }
};

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <Link href="/technique" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          <span>Retour aux cours</span>
        </Link>

        {/* En-tête */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs px-3 py-1 rounded bg-blue-900/40 text-blue-300 border border-blue-700">Atelier Pratique</span>
            <span className="text-xs text-yellow-400">Niveau : {exercise.level}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white">{exercise.title}</h1>
          <p className="text-sm text-gray-300 bg-[#0d1117] p-4 rounded-xl border border-gray-800">
            <strong>Scénario :</strong> {exercise.scenario}
          </p>

          <div className="flex space-x-2 border-b border-gray-800 pb-2">
            <button
              onClick={() => setActiveTab('instructions')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === 'instructions' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              Consignes & Critères
            </button>
            <button
              onClick={() => setActiveTab('pdi')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${activeTab === 'pdi' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              Étapes PDI
            </button>
          </div>

          {activeTab === 'instructions' ? (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400">Objectifs de l'exercice :</h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
                {exercise.instructions.map((inst, i) => <li key={i}>{inst}</li>)}
              </ul>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Guide de manipulation PDI :</h4>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-gray-300">
                {exercise.pdiSteps.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          )}
        </div>

        {/* Éditeur de code large */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-2 font-mono">
                <Terminal size={14} className="text-blue-400" />
                <span>atelier_solution.js</span>
              </span>
              <span className="text-gray-500">ServiceNow Sandbox Environment</span>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[420px] bg-transparent p-5 text-sm font-mono text-gray-200 resize-y focus:outline-none leading-relaxed"
              spellCheck={false}
            />

            <div className="bg-[#161b22] px-4 py-3 border-t border-gray-800 flex items-center justify-between">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 transition-colors"
              >
                <FileText size={14} />
                <span>{showSolution ? 'Masquer la correction' : 'Voir la correction officielle'}</span>
              </button>

              <button
                onClick={runCodeTests}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-lg cursor-pointer"
              >
                <Play size={14} />
                <span>Lancer la validation</span>
              </button>
            </div>
          </div>

          {/* Correction officielle */}
          {showSolution && (
            <div className="bg-indigo-950/30 border border-indigo-800/50 p-5 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-indigo-300 block">Correction détaillée :</span>
              <pre className="bg-[#0d1117] p-4 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto">
                {exercise.solutionCode}
              </pre>
            </div>
          )}

          {/* Résultat des tests */}
          {testResult && (
            <div className={`p-4 rounded-xl text-sm border flex items-center space-x-3 ${
              testResult.success ? 'bg-green-950/40 border-green-800 text-green-300' : 'bg-red-950/40 border-red-800 text-red-300'
            }`}>
              {testResult.success ? <CheckCircle size={20} className="text-green-400 shrink-0" /> : <AlertCircle size={20} className="text-red-400 shrink-0" />}
              <span>{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Checklist Interactive PDI */}
        <ExerciseChecklist steps={exercise.pdiSteps} />

      </div>
    </div>
  );
}

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f19] text-gray-400 flex items-center justify-center">Chargement de l'atelier...</div>}>
      <ExerciseContent params={params} />
    </Suspense>
  );
}