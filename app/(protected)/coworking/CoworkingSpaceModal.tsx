'use client';

import type { CoworkingSpace } from '@/types';

type Props = {
  open: boolean;
  space: CoworkingSpace | null;
  onClose: () => void;
};

export default function CoworkingSpaceModal({ open, space, onClose }: Props) {
  if (!open || !space) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Detalle del espacio
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{space.name}</h2>
          </div>

          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Capacidad</p>
                <p className="mt-2 text-lg text-slate-700">{space.capacity} personas</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Estado</p>
                <p className="mt-2 text-lg text-slate-700">{space.occupied ? 'Ocupado' : 'Disponible'}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Descripción</p>
              <p className="mt-2 text-slate-600">{space.description}</p>
            </div>

            {space.features.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-900">Características</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {space.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {space.occupied && (
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="text-sm font-semibold text-slate-900">Reserva actual</p>
                <p className="mt-2 text-slate-700">{space.reservedBy}</p>
                {space.startTime && space.endTime && (
                  <p className="mt-1 text-slate-600">
                    {new Intl.DateTimeFormat('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(space.startTime))}{' '}
                    →{' '}
                    {new Intl.DateTimeFormat('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(space.endTime))}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
