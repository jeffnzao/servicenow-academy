import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, courseId, status } = await request.json();

    if (!userId || !courseId) {
      return NextResponse.json({ error: 'Paramètres manquants (userId, courseId)' }, { status: 400 });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      update: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      },
      create: {
        userId,
        courseId,
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur lors de la mise à jour de la progression' }, { status: 500 });
  }
}