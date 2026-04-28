import { NextResponse } from 'next/server';
import { getCoworkingSpaces } from '@/lib/coworkingData';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const space = getCoworkingSpaces().find((item) => item.id === id);

  if (!space) {
    return NextResponse.json({ error: 'Espacio no encontrado' }, { status: 404 });
  }

  return NextResponse.json(space);
}
