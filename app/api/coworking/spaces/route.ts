import { NextResponse } from 'next/server';

const coworkingSpaces = [
  {
    id: 1,
    name: 'Sala 1',
    floor: 1,
    capacity: 4,
    occupied: true,
    reservedBy: 'Juan Pérez',
    startTime: '2025-11-23T10:00:00',
    endTime: '2025-11-23T12:00:00',
    features: ['Mesa grande', 'Sillas cómodas', 'Enchufes', 'WiFi rápido'],
    description: 'Espacio amplio para grupos de trabajo con buena iluminación y ventilación.',
  },
  {
    id: 2,
    name: 'Sala 2',
    floor: 1,
    capacity: 6,
    occupied: false,
    reservedBy: null,
    startTime: null,
    endTime: null,
    features: ['Wi‑Fi', 'Pantalla', 'Silla ergonómica'],
    description: 'Espacio tranquilo para sesiones de estudio concentrado y videollamadas.',
  },
  {
    id: 3,
    name: 'Sala 3',
    floor: 1,
    capacity: 2,
    occupied: true,
    reservedBy: 'Ana García',
    startTime: '2025-11-23T09:30:00',
    endTime: '2025-11-23T11:30:00',
    features: ['Red cableada', 'Pizarra', 'Zona común'],
    description: 'Mesa grande para trabajo colaborativo y pequeños talleres en equipo.',
  },
];

export async function GET() {
  return NextResponse.json(coworkingSpaces);
}
