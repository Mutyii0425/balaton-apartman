import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // <--- EZ A LÉNYEG! (A közösből jön)

export const dynamic = 'force-dynamic';

// FOGLALÁS LÉTREHOZÁSA (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Itt használjuk a közös prisma-t
    const newBooking = await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        checkIn: new Date(body.checkIn),
        checkOut: new Date(body.checkOut),
        guests: parseInt(body.guests),
        totalPrice: body.totalPrice,
        status: 'PENDING',
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Foglalási hiba:", error);
    return NextResponse.json({ error: 'Hiba a foglalás során' }, { status: 500 });
  }
}

// FOGLALÁSOK LEKÉRÉSE (GET)
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Lekérdezési hiba:", error);
    return NextResponse.json({ error: 'Hiba a lekérdezéskor' }, { status: 500 });
  }
}