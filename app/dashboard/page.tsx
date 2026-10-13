'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COURSES_TECHNIQUE } from '@/lib/course-registry';
import { Award, BookOpen, CheckCircle, Flame, Trophy } from 'lucide-react';

interface ProgressItem {
  courseId: string;
  status: string;
  completedAt: string | null;
}

export default function DashboardPage() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Utilise le localStorage ou l'ID par défaut "demo-user-id"
  const [userId, setUserId] = useState("demo-user-id");

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/progress?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setProgress(data.progress || []);
        }
      } catch (err) {
        console.error("Erreur de chargement de la progression", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, [userId]);

  const completedCourseIds = new Set(
    progress.filter(p => p.status === 'COMPLETED').map(p => p.courseId)
  );

  const totalCourses = COURSES_TECHNIQUE.length;
  const completedCount = completedCourseIds.size;
  const completionPercentage = Math.round((completedCount / totalCourses) * 100) || 0;

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#161b22] border border-gray-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Tableau de Bord</h1>
            <p className="text-gray-400 mt-1">Suivez votre progression et vos certifications ServiceNow.</p>
          </div>
          <Link 
            href="/technique"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 font-medium rounded-xl transition shadow-lg shadow-blue-500/20 text-white"
          >
            Reprendre le Parcours
          </Link>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Modules Requis</p>
              <p className="text-2xl font-bold text-white">{completedCount} / {totalCourses}</p>
            </div>
          </div>

          <div className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Avancement Global</p>
              <p className="text-2xl font-bold text-white">{completionPercentage}%</p>
            </div>
          </div>

          <div className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-amber-500/10 text-amber-400 rounded-xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Badges débloqués</p>
              <p className="text-2xl font-bold text-white">{completedCount >= 5 ? 'Senior Architect' : 'Junior Developer'}</p>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl space-y-3">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-gray-300">Progression globale dans le cursus</span>
            <span className="text-blue-400">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Liste des cours & Statuts */}
        <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Modules du Parcours Technique</h2>
          <div className="divide-y divide-gray-800">
            {COURSES_TECHNIQUE.map((course) => {
              const isCompleted = completedCourseIds.has(course.id);
              return (
                <div key={course.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-200">{course.title}</p>
                    <p className="text-sm text-gray-400 line-clamp-1">{course.description}</p>
                  </div>
                  <div>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" /> Terminé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-800 text-gray-400 text-xs font-medium rounded-full">
                        En attente
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}