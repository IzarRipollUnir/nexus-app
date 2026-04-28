import CoworkingHomeClient from './CoworkingHomeClient';
import styles from './page.module.css';

export default function CoworkingHomePage() {
  return (
    <section className={styles.root}>
      <CoworkingHomeClient />
    </section>
  );
}
