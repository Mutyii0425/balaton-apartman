import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// ADMINNAK: Minden vélemény lekérése (jóváhagyott és nem jóváhagyott is)
export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reviews);
}