import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { id, email, name } = await request.json();

    if (!id || !email) {
      return NextResponse.json({ error: 'ID ou e-mail manquant' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { email, name },
      create: { id, email, name },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Erreur lors de la synchronisation de l'utilisateur:", error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}