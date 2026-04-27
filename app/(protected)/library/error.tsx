'use client';

import styles from './error.module.css';

export default function LibraryError({
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>No se pudo cargar la libreria</h1>
      <p className={styles.text}>
        Revisa que la API simulada de Apidog este disponible y que los endpoints de
        <strong> /books/top </strong>
        respondan correctamente.
      </p>
      <button
        className={styles.button}
        onClick={reset}
        type="button"
      >
        Reintentar
      </button>
    </section>
  );
}
