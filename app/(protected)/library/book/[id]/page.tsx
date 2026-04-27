import Image from 'next/image';
import Link from 'next/link';
import { libraryService } from '@/lib/libraryService';
import { AddToCartButton } from './AddToCartButton';
import styles from './BookDetailPage.module.css';

type BookDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await libraryService.getBookById(id);

  return (
    <section className={styles.root}>
      <Link
        className={styles.backLink}
        href="/library"
      >
        Volver
      </Link>

      <div className={styles.grid}>
        <div className={styles.coverCard}>
          <div className={styles.coverWrap}>
            <Image alt={book.title} className={styles.coverImage} fill sizes="(max-width: 768px) 100vw, 340px" src={book.cover} />
          </div>
        </div>

        <div>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.author}>{book.author}</p>

          <div className={styles.badges}>
            {book.category ? (
              <span className={`${styles.badge} ${styles.badgeCategory}`}>
                {book.category}
              </span>
            ) : null}
            {book.year ? (
              <span className={`${styles.badge} ${styles.badgeYear}`}>
                {book.year}
              </span>
            ) : null}
          </div>

          <p className={styles.price}>
            {new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
            }).format(book.price)}
          </p>

          <dl className={styles.details}>
            <dt className={styles.detailLabel}>ISBN</dt>
            <dd className={styles.detailValue}>{book.ISBN ?? 'No disponible'}</dd>

            <dt className={styles.detailLabel}>Año de publicacion</dt>
            <dd className={styles.detailValue}>{book.year ?? 'No disponible'}</dd>
          </dl>

          <h2 className={styles.sectionTitle}>Descripcion</h2>
          <p className={styles.description}>
            {book.description ?? 'Sin descripcion disponible.'}
          </p>

          <div className={styles.actions}>
            <AddToCartButton />
          </div>
        </div>
      </div>
    </section>
  );
}
