'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { coworkingService } from '@/lib/coworkingService';
import type { Reservation } from '@/types';
import styles from './ReservationModal.module.css';

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalLabel}>
              {existingReservation ? 'Editar reserva' : 'Nueva reserva'}
            </p>
            <h2 className={styles.modalTitle}>
              {existingReservation ? 'Modificar reserva' : 'Crear reserva'}
            </h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            Cerrar
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.fieldGrid}>
            <label className={styles.fieldGroup}>
              <span className={styles.labelText}>Hora de inicio</span>
              <input
                className={styles.input}
                type="datetime-local"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </label>
            <label className={styles.fieldGroup}>
              <span className={styles.labelText}>Hora de fin</span>
              <input
                className={styles.input}
                type="datetime-local"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </label>
          </div>

          <label className={styles.fieldGroup}>
            <span className={styles.labelText}>Nombre de la reserva</span>
            <input
              className={styles.input}
              value={reservedBy}
              onChange={(event) => setReservedBy(event.target.value)}
            />
          </label>

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.buttonCancel}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.buttonSubmit} disabled={loading}>
              {existingReservation ? 'Actualizar' : 'Reservar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
