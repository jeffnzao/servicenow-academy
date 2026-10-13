'use client';

import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, Award, Flame } from 'lucide-react';
import { getUserProgress, UserProgress } from '@/lib/progress';
import { COURSES_TECHNIQUE } from '@/lib/course-registry';
import { EXERCISES_DATA } from '@/lib/course-registry';

export default function DashboardMetrics() {
  const [progress, setProgress] = useState<UserProgress>({
    completedCourses: [],
    validatedExercises: [],
    xp: 0
  });

  useEffect(() => {
    setProgress(getUserProgress());
  }, []);

  const totalCourses = COURSES_TECHNIQUE.length;
  const totalExercises = EXERCISES_DATA.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-[#111827] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
          <BookOpen size={20} />
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Cours suivis</span>
          <span className="text-xl font-bold text-white font-mono">
            {progress.completedCourses.length} / {totalCourses}
          </span>
        </div>
      </div>

      <div className="bg-[#111827] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
          <CheckCircle size={20} />
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Ateliers validés</span>
          <span className="text-xl font-bold text-white font-mono">
            {progress.validatedExercises.length} / {totalExercises}
          </span>
        </div>
      </div>

      <div className="bg-[#111827] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
          <Flame size={20} />
        </div>
        <div>
          <span className="text-xs text-gray-400 block">XP Accumulés</span>
          <span className="text-xl font-bold text-white font-mono">
            {progress.xp} XP
          </span>
        </div>
      </div>

      <div className="bg-[#111827] border border-gray-800 p-5 rounded-2xl flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
          <Award size={20} />
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Niveau actuel</span>
          <span className="text-sm font-bold text-white">
            {progress.xp > 100 ? 'Architecte Junior' : progress.xp > 30 ? 'Développeur' : 'Apprenti'}
          </span>
        </div>
      </div>
    </div>
  );
}