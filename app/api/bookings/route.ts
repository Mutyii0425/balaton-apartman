import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Biztosítsd, hogy a lib/prisma.ts létezik!

// EZ A SOR KÖTELEZŐ, HOGY NE FAGYJON LE BUILD KÖZBEN:
export const dynamic = 'force-dynamic'; 

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
    return NextResponse.json({ error: 'Hiba' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = parseInt(id);
    await prisma.booking.delete({ where: { id: bookingId } });
    return NextResponse.json({ message: 'Törölve' });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba' }, { status: 500 });
  }
}