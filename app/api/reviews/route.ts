import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// 🛑 EZ A KÉT SOR NAGYON FONTOS!
// Ez tiltja meg a rendszernek, hogy "emlékezzen" a régi adatokra.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// VÉLEMÉNY BEKÜLDÉSE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, text } = body;

    const newReview = await prisma.review.create({
      data: {
        name,
        rating: parseInt(rating),
        text,
        isApproved: false, 
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba történt' }, { status: 500 });
  }
}

// VÉLEMÉNYEK LEKÉRÉSE (A VENDÉGEKNEK)
export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { isApproved: true }, // Csak a jóváhagyottak
    orderBy: { createdAt: 'desc' },
  });
  
  // Itt is adunk egy pofont a cache-nek, biztos ami biztos
  return NextResponse.json(reviews, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}