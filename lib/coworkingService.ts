import type { CoworkingSpace, Reservation } from '@/types';

const coworkingApiBase = '/api/coworking';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${coworkingApiBase}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string>),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Coworking API request failed: ${response.status} ${response.statusText} ${text}`);
  }

  return response.json() as Promise<T>;
}

export const coworkingService = {
  getSpaces: () => request<CoworkingSpace[]>('/spaces'),
  getSpaceById: (id: string) => request<CoworkingSpace>(`/spaces/${id}`),
  getReservations: (userId: string) => request<Reservation[]>(`/reservations?user=${encodeURIComponent(userId)}`),
  createReservation: (payload: Omit<Reservation, 'id'>) =>
    request<Reservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateReservation: (id: string, payload: Omit<Reservation, 'id'>) =>
    request<Reservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify({ id: Number(id), ...payload }),
    }),
  deleteReservation: (id: string) =>
    request<{ success: boolean }>(`/reservations/${id}`, {
      method: 'DELETE',
    }),
};
