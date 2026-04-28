import type { CoworkingSpace, Reservation } from '@/types';

interface CoworkingDataState {
  spaces: CoworkingSpace[];
  reservations: Reservation[];
}

const today = new Date();

type SimpleTime = { hours: number; minutes: number };

const formatToday = ({ hours, minutes }: SimpleTime) => {
  const date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes,
    0,
    0
  );
  return date.toISOString();
};

const initialSpaces: CoworkingSpace[] = [
  {
    id: 1,
    name: 'Sala 1',
    floor: 1,
    capacity: 4,
    features: ['Mesa grande', 'Sillas cómodas', 'Enchufes', 'WiFi rápido'],
    description: 'Espacio amplio para grupos de trabajo con buena iluminación y ventilación.',
  },
  {
    id: 2,
    name: 'Sala 2',
    floor: 1,
    capacity: 6,
    features: ['Wi‑Fi', 'Pantalla', 'Silla ergonómica'],
    description: 'Espacio tranquilo para sesiones de estudio concentrado y videollamadas.',
  },
  {
    id: 3,
    name: 'Sala 3',
    floor: 1,
    capacity: 2,
    features: ['Red cableada', 'Pizarra', 'Zona común'],
    description: 'Mesa grande para trabajo colaborativo y pequeños talleres en equipo.',
  },
];

const initialReservations: Reservation[] = [
  {
    id: 1,
    userId: 'demo-user',
    spaceId: 1,
    reservedBy: 'Juan Pérez',
    startTime: formatToday({ hours: 10, minutes: 0 }),
    endTime: formatToday({ hours: 12, minutes: 0 }),
  },
  {
    id: 2,
    userId: 'demo-user',
    spaceId: 3,
    reservedBy: 'Ana García',
    startTime: formatToday({ hours: 9, minutes: 30 }),
    endTime: formatToday({ hours: 11, minutes: 30 }),
  },
];

declare global {
  var NEXUS_COWORKING_DATA: CoworkingDataState | undefined;
}

const state: CoworkingDataState = globalThis.NEXUS_COWORKING_DATA ?? {
  spaces: initialSpaces,
  reservations: initialReservations,
};

globalThis.NEXUS_COWORKING_DATA = state;

export function getCoworkingSpaces() {
  return state.spaces.map((space) => {
    const reservation = state.reservations.find((reservationItem) => reservationItem.spaceId === space.id);

    return {
      ...space,
      occupied: Boolean(reservation),
      reservedBy: reservation?.reservedBy ?? '',
      startTime: reservation?.startTime,
      endTime: reservation?.endTime,
    };
  });
}

export function getUserReservations(userId: string) {
  return state.reservations
    .filter((reservation) => reservation.userId === userId)
    .map((reservation) => ({
      ...reservation,
      spaceName: state.spaces.find((space) => space.id === reservation.spaceId)?.name ?? 'Espacio',
    }));
}

export function createOrUpdateReservation(payload: Omit<Reservation, 'id'> & { id?: number }) {
  if (payload.id) {
    const index = state.reservations.findIndex((item) => item.id === payload.id);
    if (index >= 0) {
      state.reservations[index] = {
        ...state.reservations[index],
        ...payload,
      };
      return state.reservations[index];
    }
  }

  const nextId = state.reservations.length > 0 ? Math.max(...state.reservations.map((item) => item.id)) + 1 : 1;
  const reservation = {
    id: nextId,
    ...payload,
  } as Reservation;
  state.reservations.push(reservation);
  return reservation;
}

export function deleteReservationById(id: number) {
  const index = state.reservations.findIndex((item) => item.id === id);
  if (index >= 0) {
    state.reservations.splice(index, 1);
    return true;
  }
  return false;
}
