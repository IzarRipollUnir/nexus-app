import styles from './page.module.css';

export default function CoworkingHomePage() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Coworking Home</h1>
      <p className={styles.subtitle}>Ruta protegida: /coworking</p>
    </section>
  );
}
