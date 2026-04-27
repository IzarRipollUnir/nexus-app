import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { libraryService } from '@/lib/libraryService';
import styles from './page.module.css';

export default async function LibraryHistoricPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value ?? '';
  const userId = sessionValue.match(/\d+/)?.[0] ?? '1';
  const books = await libraryService.getHistoric(userId);

  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Library Historic</h1>
      <p className={styles.subtitle}>Libros adquiridos previamente</p>

      {books.length === 0 ? (
        <p className={styles.emptyState}>Todavia no hay compras en el historico.</p>
      ) : (
        <div className={styles.grid}>
          {books.map((book) => (
            <article className={styles.card} key={book.id}>
              <Link className={styles.cardLink} href={`/library/book/${book.id}`}>
                <div className={styles.coverWrap}>
                  <Image
                    alt={book.title}
                    className={styles.coverImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    src={book.cover}
                  />
                </div>

                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{book.title}</h2>
                  <p className={styles.cardAuthor}>{book.author}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
