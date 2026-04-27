import styles from './loading.module.css';

export default function LibraryCategoryLoading() {
  return (
    <section className={styles.root}>
      <aside className={styles.sidebar} />
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div className={styles.card} key={index} />
        ))}
      </div>
    </section>
  );
}
