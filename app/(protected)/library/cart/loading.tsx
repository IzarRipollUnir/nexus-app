import styles from './loading.module.css';

export default function LibraryCartLoading() {
  return (
    <section className={styles.root}>
      <div className={styles.title} />
      <div className={styles.stack}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div className={styles.card} key={index} />
        ))}
      </div>
    </section>
  );
}
