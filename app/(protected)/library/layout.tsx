import { LibraryHeader } from './_components/LibraryHeader';
import styles from './layout.module.css';

export default function LibraryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className={styles.root}>
      <LibraryHeader />
      {children}
    </section>
  );
}
