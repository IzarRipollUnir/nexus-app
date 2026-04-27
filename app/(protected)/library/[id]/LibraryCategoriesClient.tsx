'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Book, BookFilters } from '@/types';
import styles from './LibraryCategoriesClient.module.css';

type LibraryCategoriesClientProps = {
  categoryName: string;
  initialBooks: Book[];
};

export function LibraryCategoriesClient({
  categoryName,
  initialBooks,
}: LibraryCategoriesClientProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<BookFilters>({ category: categoryName });

  const handleFilterChange = <K extends keyof BookFilters>(key: K, value: BookFilters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.set('category', filters.category ?? categoryName);
      if (filters.author) params.set('author', filters.author);
      if (filters.title) params.set('title', filters.title);
      if (filters.year) params.set('year', String(filters.year));
      if (filters.priceMax) params.set('priceMax', String(filters.priceMax));
      if (filters.ISBN) params.set('ISBN', filters.ISBN);

      const response = await fetch(`/api/library/books?${params.toString()}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('No se pudieron aplicar los filtros');
      }

      const nextBooks: Book[] = await response.json();
      setBooks(nextBooks);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.layout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarCategory}>Categoría: {categoryName}</p>

        <div className={styles.filters}>
          <label className={styles.field}>
            ISBN
            <input
              className={styles.input}
              value={filters.ISBN ?? ''}
              onChange={(event) => handleFilterChange('ISBN', event.target.value)}
              placeholder="978..."
              type="text"
            />
          </label>

          <label className={styles.field}>
            Autor
            <input
              className={styles.input}
              value={filters.author ?? ''}
              onChange={(event) => handleFilterChange('author', event.target.value)}
              type="text"
            />
          </label>

          <label className={styles.field}>
            Título
            <input
              className={styles.input}
              value={filters.title ?? ''}
              onChange={(event) => handleFilterChange('title', event.target.value)}
              type="text"
            />
          </label>

          <label className={styles.field}>
            Año
            <input
              className={styles.input}
              value={filters.year ?? ''}
              onChange={(event) =>
                handleFilterChange('year', event.target.value ? Number(event.target.value) : undefined)
              }
              type="number"
            />
          </label>

          <label className={styles.field}>
            Precio máximo (€)
            <input
              className={styles.rangeInput}
              max={500}
              min={0}
              onChange={(event) => handleFilterChange('priceMax', Number(event.target.value))}
              type="range"
              value={filters.priceMax ?? 100}
            />
          </label>

          <button
            className={styles.applyButton}
            disabled={loading}
            onClick={applyFilters}
            type="button"
          >
            {loading ? 'Aplicando...' : 'Aplicar filtros'}
          </button>
        </div>
      </aside>

      <div className={styles.content}>

        {books.length === 0 ? (
          <p className={styles.emptyState}>
            No hay libros para mostrar con estos filtros.
          </p>
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
        )}
      </div>
    </section>
  );
}
