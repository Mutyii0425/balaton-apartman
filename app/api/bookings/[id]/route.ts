import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // <--- ITT A VÁLTOZÁS! (A közösből importáljuk)

export const dynamic = 'force-dynamic';

// MÓDOSÍTÁS (PATCH)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = parseInt(id);
    const body = await request.json();
    
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: body,
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Hiba:", error);
    return NextResponse.json({ error: 'Hiba a frissítéskor' }, { status: 500 });
  }
}

// TÖRLÉS (DELETE)
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
    console.error("Hiba:", error);
    return NextResponse.json({ error: 'Hiba a törléskor' }, { status: 500 });
  }
}