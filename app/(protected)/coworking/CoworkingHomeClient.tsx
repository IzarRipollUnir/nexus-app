'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { coworkingService } from '@/lib/coworkingService';
import type { CoworkingSpace, Reservation } from '@/types';
import CoworkingSpaceModal from './CoworkingSpaceModal';
import ReservationModal from './ReservationModal';

const currentUserId = 'demo-user';

const formatTime = (isoString?: string) => {
  if (!isoString) return '';
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoString));
};

export default function CoworkingHomeClient() {
  const [spaces, setSpaces] = useState<CoworkingSpace[]>([]);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [loadingSpaces, setLoadingSpaces] = useState(true);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState<CoworkingSpace | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState<Reservation | null>(null);
  const [saving, setSaving] = useState(false);
  const [operationError, setOperationError] = useState('');

  const fetchSpaces = async () => {
    setLoadingSpaces(true);
    try {
      const result = await coworkingService.getSpaces();
      setSpaces(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSpaces(false);
    }
  };

  const fetchReservations = async () => {
    setLoadingReservations(true);
    try {
      const result = await coworkingService.getReservations(currentUserId);
      setMyReservations(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReservations(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
    fetchReservations();
  }, []);

  const openDetails = (space: CoworkingSpace) => {
    setSelectedSpace(space);
    setDetailOpen(true);
  };

  const closeDetails = () => {
    setDetailOpen(false);
    setSelectedSpace(null);
  };

  const openReservation = (space: CoworkingSpace) => {
    setSelectedSpace(space);
    setEditingReservation(null);
    setOperationError('');
    setReservationOpen(true);
  };

  const openEditReservation = (reservation: Reservation) => {
    const targetSpace = spaces.find((space) => space.id === reservation.spaceId) ?? null;
    setSelectedSpace(targetSpace);
    setEditingReservation(reservation);
    setOperationError('');
    setReservationOpen(true);
  };

  const closeReservation = () => {
    setReservationOpen(false);
    setEditingReservation(null);
    setSelectedSpace(null);
  };

  const openDeleteReservation = (reservation: Reservation) => {
    setReservationToDelete(reservation);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setReservationToDelete(null);
  };

  const refreshAll = async () => {
    await Promise.all([fetchSpaces(), fetchReservations()]);
  };

  const handleSavedReservation = async () => {
    await refreshAll();
  };

  const handleConfirmDelete = async () => {
    if (!reservationToDelete) return;
    setSaving(true);
    setOperationError('');

    try {
      await coworkingService.deleteReservation(String(reservationToDelete.id));
      await refreshAll();
      closeDelete();
    } catch (error) {
      console.error(error);
      setOperationError('No se pudo eliminar la reserva. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Espacios de Co-working</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Encuentra y reserva espacios de trabajo disponibles en la librería universitaria.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700 shadow-sm">
            <p className="text-sm font-medium">Co-working</p>
            <p className="text-xs text-slate-500">Gestiona tus reservas desde aquí.</p>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Todos los espacios</h3>
            <p className="text-sm text-slate-500">Haz clic en un espacio para ver más información.</p>
          </div>
          {loadingSpaces && (
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
              Cargando espacios...
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {spaces.map((space) => (
            <article
              key={space.id}
              className={`group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${
                space.occupied ? 'border-red-300 bg-red-50/50' : 'border-emerald-300 bg-emerald-50/60'
              }`}
              onClick={() => openDetails(space)}
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">{space.name}</h4>
                    <p className="mt-1 text-sm text-slate-600">Capacidad para {space.capacity} personas</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      space.occupied ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {space.occupied ? 'Ocupado' : 'Disponible'}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {space.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm text-slate-600">{space.description}</p>

                {space.occupied && (
                  <div className="mt-6 rounded-3xl bg-white p-4 text-sm shadow-sm">
                    <p className="font-semibold text-slate-900">Reservado por {space.reservedBy}</p>
                    <p className="text-slate-600">
                      {formatTime(space.startTime)} &rarr; {formatTime(space.endTime)}
                    </p>
                  </div>
                )}
              </div>

              {!space.occupied && (
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  onClick={(event) => {
                    event.stopPropagation();
                    openReservation(space);
                  }}
                >
                  Reservar espacio
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Mis reservas</h3>
            <p className="text-sm text-slate-500">Edita o elimina tus reservas activas.</p>
          </div>
          {loadingReservations && (
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
              Cargando reservas...
            </span>
          )}
        </div>

        {!loadingReservations && myReservations.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
            No tienes reservas activas.
          </div>
        )}

        <div className="grid gap-4">
          {myReservations.map((reservation) => (
            <article key={reservation.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{reservation.spaceName}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatTime(reservation.startTime)} &rarr; {formatTime(reservation.endTime)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    onClick={() => openEditReservation(reservation)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    onClick={() => openDeleteReservation(reservation)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CoworkingSpaceModal open={detailOpen} space={selectedSpace} onClose={closeDetails} />

      {selectedSpace && (
        <ReservationModal
          open={reservationOpen}
          onClose={closeReservation}
          spaceId={selectedSpace.id}
          existingReservation={editingReservation ?? undefined}
          onSaved={handleSavedReservation}
        />
      )}

      {deleteOpen && reservationToDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <div className="border-b border-slate-200 px-6 py-5">
              <h4 className="text-2xl font-semibold text-slate-900">Eliminar reserva</h4>
              <p className="mt-2 text-sm text-slate-600">¿Estás seguro de que deseas eliminar esta reserva?</p>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm text-slate-700">
                {reservationToDelete.spaceName} · {formatTime(reservationToDelete.startTime)} &rarr; {formatTime(reservationToDelete.endTime)}
              </p>
              {operationError && <p className="text-sm text-red-600">{operationError}</p>}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  onClick={closeDelete}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleConfirmDelete}
                  disabled={saving}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
