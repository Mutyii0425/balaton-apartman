import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';



// ADMINNAK: Minden vélemény lekérése (jóváhagyott és nem jóváhagyott is)
export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reviews);
}