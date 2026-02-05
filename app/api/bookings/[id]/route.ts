import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// 🛑 EZ A SOR NAGYON FONTOS A VERCELNEK:
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// MÓDOSÍTÁS (PATCH) - Pl. Amikor rányomsz az "Elfogad" vagy "Elutasít" gombra
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Next.js 15-ben await kell
    const bookingId = parseInt(id);
    
    // A kérésből jön az új státusz (pl. { status: 'CONFIRMED' })
    const body = await request.json();
    
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: body,
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Hiba a foglalás frissítésekor:", error);
    return NextResponse.json({ error: 'Hiba a frissítéskor' }, { status: 500 });
  }
}

// TÖRLÉS (DELETE) - Amikor a kukára nyomsz
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = parseInt(id);
    
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ message: 'Törölve' });
  } catch (error) {
    console.error("Hiba a törléskor:", error);
    return NextResponse.json({ error: 'Hiba a törléskor' }, { status: 500 });
  }
}