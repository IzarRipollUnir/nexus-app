import { NextResponse } from 'next/server';
import { deleteReservationById } from '@/lib/coworkingData';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const reservationId = Number(id);

  if (!Number.isFinite(reservationId)) {
    return NextResponse.json({ success: false, message: 'Identificador de reserva inválido.' }, { status: 400 });
  }

  const deleted = deleteReservationById(reservationId);
  if (!deleted) {
    return NextResponse.json({ success: false, message: 'Reserva no encontrada.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
