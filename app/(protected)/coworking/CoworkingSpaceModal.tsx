'use client';

import type { CoworkingSpace } from '@/types';
import styles from './CoworkingSpaceModal.module.css';

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.modalLabel}>Detalle del espacio</p>
            <h2 className={styles.modalTitle}>{space.name}</h2>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            Cerrar
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalGrid}>
            <div className={styles.infoCard}>
              <p className={styles.infoLabel}>Capacidad</p>
              <p className={styles.infoValue}>{space.capacity} personas</p>
            </div>
            <div className={styles.infoCard}>
              <p className={styles.infoLabel}>Estado</p>
              <p className={styles.infoValue}>{space.occupied ? 'Ocupado' : 'Disponible'}</p>
            </div>
          </div>

          <div className={styles.description}>
            <p className={styles.infoLabel}>Descripción</p>
            <p className={styles.description}>{space.description}</p>
          </div>

          {space.features.length > 0 && (
            <div>
              <p className={styles.infoLabel}>Características</p>
              <div className={styles.featureList}>
                {space.features.map((feature) => (
                  <span key={feature} className={styles.featureChip}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {space.occupied && (
            <div className={styles.reservationInfo}>
              <p className={styles.reservationLabel}>Reserva actual</p>
              <p className={styles.reservationText}>{space.reservedBy}</p>
              {space.startTime && space.endTime && (
                <p className={styles.reservationText}>
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
  );
}
