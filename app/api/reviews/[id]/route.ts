import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';



// JÓVÁHAGYÁS (PATCH)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("--- JÓVÁHAGYÁS INDULT ---");

  try {
    // 1. ID kinyerése (biztonságosan)
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    
    console.log(`Jóváhagyandó ID: ${id}`);

    if (isNaN(id)) {
      console.log("HIBA: Érvénytelen ID");
      return NextResponse.json({ error: 'Hibás ID' }, { status: 400 });
    }

    // 2. Adatbázis frissítése (NEM OLVASUNK request.json-t!)
    const updatedReview = await prisma.review.update({
      where: { id: id },
      data: { isApproved: true },
    });

    console.log("SIKER! Vélemény jóváhagyva.");
    return NextResponse.json(updatedReview);

  } catch (error) {
    console.error("KRITIKUS HIBA:", error);
    return NextResponse.json({ error: 'Szerver hiba' }, { status: 500 });
  }
}

// TÖRLÉS (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.review.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Törölve' });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba törléskor' }, { status: 500 });
  }
}