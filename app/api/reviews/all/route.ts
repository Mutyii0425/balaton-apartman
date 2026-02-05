import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ADMINNAK: Minden vélemény lekérése (jóváhagyott és nem jóváhagyott is)
export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reviews);
}