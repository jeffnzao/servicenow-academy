import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EXERCISES_DATA } from '@/lib/course-registry';

export async function POST(request: Request) {
  try {
    const { userId, exerciseId, codeSnippet, status } = await request.json();

    if (!userId || !exerciseId || !codeSnippet || !status) {
      return NextResponse.json({ error: 'Paramètres manquants (userId, exerciseId, codeSnippet, status)' }, { status: 400 });
    }

    // 1. Enregistrer la soumission de l'exercice
    const submission = await prisma.exerciseSubmission.create({
      data: {
        userId,
        exerciseId,
        codeSnippet,
        status, // 'SUCCESS' ou 'FAILED'
      },
    });

    // 2. Si l'exercice est réussi, marquer automatiquement le cours associé comme terminé
    if (status === 'SUCCESS') {
      const exercise = EXERCISES_DATA.find((ex: { id: string; courseId: string }) => ex.id === exerciseId);
      
      if (exercise && exercise.courseId) {
        await prisma.userProgress.upsert({
          where: {
            userId_courseId: {
              userId,
              courseId: exercise.courseId,
            },
          },
          update: {
            status: 'COMPLETED',
            completedAt: new Date(),
          },
          create: {
            userId,
            courseId: exercise.courseId,
            status: 'COMPLETED',
            completedAt: new Date(),
          },
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: status === 'SUCCESS' ? 'Exercice validé et progression mise à jour !' : 'Soumission enregistrée.',
      submission 
    });

  } catch (error) {
    console.error("Erreur lors de la soumission de l'exercice:", error);
    return NextResponse.json({ error: 'Erreur serveur lors de la validation de l’exercice' }, { status: 500 });
  }
}