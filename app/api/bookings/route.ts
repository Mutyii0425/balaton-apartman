import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotificationToAdmin } from '@/lib/mail';

export const dynamic = 'force-dynamic';



export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. KIVESSZÜK AZ ÚJ ADATOT (paymentMethod)
    const { 
      name, email, phone, 
      startDate, endDate, 
      adults, children, 
      hasDog, needsHeating, 
      totalPrice, 
      paymentMethod // <--- ÚJ MEZŐ ITT
    } = body;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Összesített létszám
    const guestCount = parseInt(adults) + parseInt(children);

    // Foglaltság ellenőrzése
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
        OR: [
          { startDate: { lte: end }, endDate: { gte: start } }
        ]
      }
    });

    const isAp1Taken = conflictingBookings.some(b => b.apartmentId === 1 || b.apartmentId === 3);
    const isAp2Taken = conflictingBookings.some(b => b.apartmentId === 2 || b.apartmentId === 3);

    let assignedApartment = 0;

    if (guestCount > 3) {
      if (!isAp1Taken && !isAp2Taken) {
        assignedApartment = 3; 
      } else {
        return NextResponse.json({ error: 'Nincs elég hely! 4+ főhöz mindkét apartmanra szükség van.' }, { status: 409 });
      }
    } else {
      if (!isAp1Taken) {
        assignedApartment = 1;
      } else if (!isAp2Taken) {
        assignedApartment = 2;
      } else {
        return NextResponse.json({ error: 'Sajnos erre az időpontra már nincs szabad apartman.' }, { status: 409 });
      }
    }

    // MENTÉS AZ ÚJ ADATOKKAL
    const newBooking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        guests: guestCount,
        adults: parseInt(adults),
        children: parseInt(children),
        hasDog: hasDog,
        needsHeating: needsHeating,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod, // <--- 2. ELMENTJÜK AZ ADATBÁZISBA
        startDate: start,
        endDate: end,
        apartmentId: assignedApartment,
        status: 'PENDING'
      },
    });

    // Email küldése (már az új adatokkal megy át)
    await sendNotificationToAdmin(newBooking);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Hiba:", error);
    return NextResponse.json({ error: 'Sikertelen foglalás' }, { status: 500 });
  }
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(bookings);
}