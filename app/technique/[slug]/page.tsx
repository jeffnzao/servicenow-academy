'use client';

import { use, Suspense } from 'react';
import Link from 'next/link';
import { COURSES_TECHNIQUE } from '@/lib/course-registry';
import { ArrowLeft, BookOpen, Play } from 'lucide-react';

function CourseDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const course = COURSES_TECHNIQUE.find((c) => c.slug === resolvedParams.slug) || COURSES_TECHNIQUE[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/technique" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={16} />
        <span>Retour au catalogue technique</span>
      </Link>

      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs px-3 py-1 rounded bg-blue-900/40 text-blue-300 border border-blue-700">{course.category}</span>
          <span className="text-xs text-gray-400">Durée estimée : {course.duration}</span>
          <span className="text-xs text-yellow-400">Niveau : {course.level}</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-white">{course.title}</h1>
        <p className="text-gray-300 text-sm leading-relaxed">{course.description}</p>
      </div>

      <div className="space-y-6">
        {course.sections.map((sec, index) => (
          <div key={index} className="bg-[#111827] border border-gray-800 rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-bold text-white">{sec.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>

      {course.relatedExerciseId && (
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-700/50 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Prêt à passer à la pratique ?</h3>
            <p className="text-xs text-gray-300 mt-0.5">Mets en application ce cours à travers un atelier interactif.</p>
          </div>
          <Link
            href={`/exercise/${course.relatedExerciseId}`}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-3 rounded-xl inline-flex items-center space-x-2 transition-colors shrink-0 shadow-lg"
          >
            <Play size={14} />
            <span>Pratiquer ce sujet</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans p-6 md:p-12">
      <Suspense fallback={<div className="text-center text-gray-400 py-12">Chargement du cours technique...</div>}>
        <CourseDetailContent params={params} />
      </Suspense>
    </div>
  );
}