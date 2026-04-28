'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { coworkingService } from '@/lib/coworkingService';
import type { CoworkingSpace, Reservation } from '@/types';
import CoworkingSpaceModal from './CoworkingSpaceModal';
import ReservationModal from './ReservationModal';
import styles from './CoworkingHomeClient.module.css';

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
      <div className={styles.hero}>
        <div className={styles.heroHeader}>
          <div>
            <h2 className={styles.heroTitle}>Espacios de Co-working</h2>
            <p className={styles.heroText}>
              Encuentra y reserva espacios de trabajo disponibles en la librería universitaria.
            </p>
          </div>
          <div className={styles.heroBadge}>
            <p className={styles.heroBadgeTitle}>Co-working</p>
            <p className={styles.heroBadgeText}>Gestiona tus reservas desde aquí.</p>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Todos los espacios</h3>
            <p className={styles.sectionSubtitle}>Haz clic en un espacio para ver más información.</p>
          </div>
          {loadingSpaces && <span className={styles.loadingBadge}>Cargando espacios...</span>}
        </div>

        <div className={styles.grid}>
          {spaces.map((space) => (
            <article
              key={space.id}
              className={[
                styles.card,
                space.occupied ? styles.cardOccupied : styles.cardAvailable,
              ].join(' ')}
              onClick={() => openDetails(space)}
            >
              <div>
                <div className={styles.cardHeader}>
                  <div>
                    <h4 className={styles.cardTitle}>{space.name}</h4>
                    <p className={styles.cardMetadata}>Capacidad para {space.capacity} personas</p>
                  </div>
                  <span
                    className={[
                      styles.statusBadge,
                      space.occupied ? styles.statusOccupied : styles.statusAvailable,
                    ].join(' ')}
                  >
                    {space.occupied ? 'Ocupado' : 'Disponible'}
                  </span>
                </div>

                <div className={styles.features}>
                  {space.features.map((feature) => (
                    <span key={feature} className={styles.featurePill}>
                      {feature}
                    </span>
                  ))}
                </div>

                <p className={styles.cardText}>{space.description}</p>

                {space.occupied && (
                  <div className={styles.cardDetails}>
                    <p className={styles.cardDetailsTitle}>Reservado por {space.reservedBy}</p>
                    <p className={styles.cardDetailsText}>
                      {formatTime(space.startTime)} &rarr; {formatTime(space.endTime)}
                    </p>
                  </div>
                )}
              </div>

              {!space.occupied && (
                <button
                  type="button"
                  className={styles.reserveButton}
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

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Mis reservas</h3>
            <p className={styles.sectionSubtitle}>Edita o elimina tus reservas activas.</p>
          </div>
          {loadingReservations && <span className={styles.loadingBadge}>Cargando reservas...</span>}
        </div>

        {!loadingReservations && myReservations.length === 0 && (
          <div className={styles.noResults}>No tienes reservas activas.</div>
        )}

        <div className={styles.reservationsList}>
          {myReservations.map((reservation) => (
            <article key={reservation.id} className={styles.reservationCard}>
              <div className={styles.reservationTop}>
                <div>
                  <p className={styles.reservationTitle}>{reservation.spaceName}</p>
                  <p className={styles.reservationTime}>
                    {formatTime(reservation.startTime)} &rarr; {formatTime(reservation.endTime)}
                  </p>
                </div>
                <div className={styles.reservationActions}>
                  <button type="button" className={styles.buttonSecondary} onClick={() => openEditReservation(reservation)}>
                    Editar
                  </button>
                  <button type="button" className={styles.buttonDanger} onClick={() => openDeleteReservation(reservation)}>
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
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmCard}>
            <div className={styles.confirmHeader}>
              <h4 className={styles.confirmTitle}>Eliminar reserva</h4>
              <p className={styles.confirmText}>¿Estás seguro de que deseas eliminar esta reserva?</p>
            </div>
            <div className={styles.confirmBody}>
              <p className={styles.cardText}>
                {reservationToDelete.spaceName} · {formatTime(reservationToDelete.startTime)} &rarr; {formatTime(reservationToDelete.endTime)}
              </p>
              {operationError && <p className={styles.errorText}>{operationError}</p>}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" className={styles.buttonSecondary} onClick={closeDelete}>
                  Cancelar
                </button>
                <button type="button" className={styles.buttonDanger} onClick={handleConfirmDelete} disabled={saving}>
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
