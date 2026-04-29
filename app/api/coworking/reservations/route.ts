import { NextResponse } from 'next/server';
import { createOrUpdateReservation, deleteReservationById, getUserReservations } from '@/lib/coworkingData';
import type { Reservation } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user') ?? '';
  const reservations = getUserReservations(user);
  return NextResponse.json(reservations);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Omit<Reservation, 'id'> & { id?: number };
  const reservation = createOrUpdateReservation(payload);
  return NextResponse.json(reservation);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  let id = url.searchParams.get('id');

  if (!id) {
    const body = (await request.json().catch(() => null)) as { id?: number | string } | null;
    if (body?.id !== undefined) {
      id = String(body.id);
    }
  }

  const reservationId = Number(id);
  if (!Number.isFinite(reservationId)) {
    return NextResponse.json(
      { success: false, message: 'Id de reserva inválido.' },
      { status: 400 }
    );
  }

  const deleted = deleteReservationById(reservationId);
  if (!deleted) {
    return NextResponse.json(
      { success: false, message: 'Reserva no encontrada.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
