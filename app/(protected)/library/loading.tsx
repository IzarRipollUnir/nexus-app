import styles from './loading.module.css';

export default function LibraryLoading() {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Library Home</h1>
      <div className={styles.grid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.image} />
            <div className={styles.content}>
              <div className={styles.line} />
              <div className={`${styles.line} ${styles.lineShort}`} />
              <div className={`${styles.line} ${styles.linePrice}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
