import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export const dynamic = 'force-dynamic';


const prisma = new PrismaClient();


// JÓVÁHAGYÁS (Amikor a "Publikál" gombra nyomsz)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Kivesszük az ID-t a linkből
    const { id } = await params;
    const reviewId = parseInt(id);

    // 2. Frissítjük az adatbázist (isApproved = true)
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { isApproved: true },
    });

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error("Hiba a vélemény jóváhagyásakor:", error);
    return NextResponse.json({ error: 'Hiba történt' }, { status: 500 });
  }
}

// TÖRLÉS (Amikor a kuka ikonra nyomsz)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Törölve' });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba törléskor' }, { status: 500 });
  }
}