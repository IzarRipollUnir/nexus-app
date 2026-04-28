'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { coworkingService } from '@/lib/coworkingService';
import type { Reservation } from '@/types';

type Props = {
  open: boolean;
  onClose: () => void;
  spaceId: number;
  existingReservation?: Reservation;
  onSaved?: () => void;
};

const formatForInput = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

const toISOStringFromLocal = (value: string) => {
  const date = new Date(value);
  return date.toISOString();
};

export default function ReservationModal({
  open,
  onClose,
  spaceId,
  existingReservation,
  onSaved,
}: Props) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reservedBy, setReservedBy] = useState('Demo usuario');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setError('');
      return;
    }

    if (existingReservation) {
      setStartTime(formatForInput(existingReservation.startTime));
      setEndTime(formatForInput(existingReservation.endTime));
      setReservedBy(existingReservation.reservedBy ?? 'Demo usuario');
    } else {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      const offset = now.getTimezoneOffset();
      const localNow = new Date(now.getTime() - offset * 60000);
      const localLater = new Date(oneHourLater.getTime() - offset * 60000);
      setStartTime(localNow.toISOString().slice(0, 16));
      setEndTime(localLater.toISOString().slice(0, 16));
      setReservedBy('Demo usuario');
    }
    setError('');
  }, [open, existingReservation]);

  if (!open) {
    return null;
  }

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!startTime || !endTime) {
      setError('Debes seleccionar hora de inicio y fin.');
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      setError('La hora de fin debe ser posterior a la de inicio.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        userId: 'demo-user',
        spaceId,
        reservedBy: reservedBy.trim() || 'Demo usuario',
        startTime: toISOStringFromLocal(startTime),
        endTime: toISOStringFromLocal(endTime),
      };

      if (existingReservation?.id) {
        await coworkingService.updateReservation(String(existingReservation.id), payload);
      } else {
        await coworkingService.createReservation(payload);
      }

      onSaved?.();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Error al guardar la reserva. Vuelve a intentarlo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {existingReservation ? 'Editar reserva' : 'Nueva reserva'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {existingReservation ? 'Modificar reserva' : 'Crear reserva'}
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSave}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              Hora de inicio
              <input
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                type="datetime-local"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              Hora de fin
              <input
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                type="datetime-local"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-700">
            Nombre de la reserva
            <input
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              value={reservedBy}
              onChange={(event) => setReservedBy(event.target.value)}
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {existingReservation ? 'Actualizar' : 'Reservar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
