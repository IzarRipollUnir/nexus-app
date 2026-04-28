import { NextResponse } from 'next/server';
import { getCoworkingSpaces } from '@/lib/coworkingData';

export async function GET() {
  const spaces = getCoworkingSpaces();
  return NextResponse.json(spaces);
}
