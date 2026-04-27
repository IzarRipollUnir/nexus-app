import Image from 'next/image';
import Link from 'next/link';
import { libraryService } from '@/lib/libraryService';
import styles from './page.module.css';

export default async function LibraryHomePage() {
  const bestSellers = await libraryService.getBestSellers();

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <div>
          <p className={styles.subtitle}>Los 10 mas vendidos</p>
        </div>
      </header>

      <div className={styles.grid}>
        {bestSellers.map((book) => (
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
                <p className={styles.cardPrice}>
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(book.price)}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
