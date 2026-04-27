'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';
import styles from './ProtectedNavbar.module.css';

type ProtectedNavbarProps = {
  userName?: string;
};

export function ProtectedNavbar({ userName }: ProtectedNavbarProps) {
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <header className={styles.root}>
        <div className={styles.container}>
          <button
            className={styles.brandButton}
            onClick={() => router.push('/')}
            type="button"
          >
            NEXUS
          </button>

          <div className={styles.desktopNav}>
            <button
              className={styles.navButton}
              onClick={() => router.push('/library')}
              type="button"
            >
              Libreria
            </button>
            <button
              className={styles.navButton}
              onClick={() => router.push('/coworking')}
              type="button"
            >
              Co-working
            </button>
          </div>

          <div className={styles.mobileNav}>
            <button
              aria-label="library"
              className={styles.iconButton}
              onClick={() => router.push('/library')}
              type="button"
            >
              📚
            </button>
            <button
              aria-label="coworking"
              className={styles.iconButton}
              onClick={() => router.push('/coworking')}
              type="button"
            >
              💼
            </button>
          </div>

          <span className={styles.userName}>{userName ?? 'Usuario'}</span>

          <button
            aria-label="logout"
            className={styles.logoutButton}
            onClick={() => setLogoutModalOpen(true)}
            type="button"
          >
            Salir
          </button>
        </div>
      </header>

      {logoutModalOpen ? (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h2 className={styles.modalTitle}>Cerrar sesión</h2>
            <p className={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</p>

            <div className={styles.modalActions}>
              <button
                className={styles.modalCancel}
                onClick={() => setLogoutModalOpen(false)}
                type="button"
              >
                Cancelar
              </button>

              <form action={logout}>
                <button
                  aria-label="confirm-logout"
                  className={styles.modalConfirm}
                  type="submit"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
