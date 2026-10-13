'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { COURSES_TECHNIQUE } from '@/lib/course-registry';
import { ArrowLeft, BookOpen, Play, CheckCircle } from 'lucide-react';
import CourseFilter from '@/components/courses/CourseFilter';

interface ProgressItem {
  courseId: string;
  status: string;
}

export default function TechniqueCataloguePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchUserProgress() {
      try {
        const userId = localStorage.getItem('sn_academy_user_id') || 'demo-user-id';
        const res = await fetch(`/api/progress?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          const completed = new Set<string>(
            (data.progress || [])
              .filter((p: ProgressItem) => p.status === 'COMPLETED')
              .map((p: ProgressItem) => p.courseId)
          );
          setCompletedCourses(completed);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de la progression du catalogue", err);
      }
    }
    fetchUserProgress();
  }, []);

  // Filtrage dynamique des cours
  const filteredCourses = COURSES_TECHNIQUE.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          <span>Retour à l'accueil</span>
        </Link>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Parcours Technique</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Catalogue des Cours & Scripting ServiceNow</h1>
          <p className="text-gray-400 text-sm mt-1">Maîtrisez le code, les API, le contexte client/serveur et l'architecture technique.</p>
        </div>

        {/* Barre de recherche et filtres */}
        <CourseFilter
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Liste des cours filtrés */}
        <div className="space-y-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const isCompleted = completedCourses.has(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-[#111827] border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {course.category}
                      </span>
                      <span className="text-xs text-gray-400">Niveau : {course.level}</span>
                      <span className="text-xs text-gray-500">Durée : {course.duration}</span>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
                          <CheckCircle size={12} /> Terminé
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">{course.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{course.description}</p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto justify-end">
                    <Link
                      href={`/technique/${course.slug}`}
                      className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-1.5"
                    >
                      <BookOpen size={14} />
                      <span>Lire le cours</span>
                    </Link>

                    {course.relatedExerciseId && (
                      <Link
                        href={`/exercise/${course.relatedExerciseId}`}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center space-x-1.5 shadow-md shadow-blue-600/20"
                      >
                        <Play size={14} />
                        <span>Pratiquer</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-12 text-center text-gray-400 text-sm">
              Aucun cours technique ne correspond à votre recherche.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}