'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Book, BookFilters } from '@/types';

type LibraryCategoriesClientProps = {
  categoryId: string;
  categoryName: string;
  initialBooks: Book[];
};

export function LibraryCategoriesClient({
  categoryId,
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
    <section className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h1 className="text-3xl font-semibold">Library Categories</h1>
        <p className="mt-1 text-zinc-600">Categoría: {categoryName}</p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            ISBN
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              value={filters.ISBN ?? ''}
              onChange={(event) => handleFilterChange('ISBN', event.target.value)}
              placeholder="978..."
              type="text"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Autor
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              value={filters.author ?? ''}
              onChange={(event) => handleFilterChange('author', event.target.value)}
              type="text"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Título
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              value={filters.title ?? ''}
              onChange={(event) => handleFilterChange('title', event.target.value)}
              type="text"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Año
            <input
              className="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
              value={filters.year ?? ''}
              onChange={(event) =>
                handleFilterChange('year', event.target.value ? Number(event.target.value) : undefined)
              }
              type="number"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Precio máximo (€)
            <input
              className="mt-1 w-full"
              max={500}
              min={0}
              onChange={(event) => handleFilterChange('priceMax', Number(event.target.value))}
              type="range"
              value={filters.priceMax ?? 100}
            />
          </label>

          <button
            className="w-full rounded bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={applyFilters}
            type="button"
          >
            {loading ? 'Aplicando...' : 'Aplicar filtros'}
          </button>
        </div>
      </aside>

      <div>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-zinc-500">Ruta</p>
            <p className="text-lg font-medium text-zinc-700">/library/{categoryId}</p>
          </div>
          <Link className="rounded border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100" href="/library">
            Volver a la librería
          </Link>
        </div>

        {books.length === 0 ? (
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-700">
            No hay libros para mostrar con estos filtros.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {books.map((book) => (
              <article
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5"
                key={book.id}
              >
                <Link href={`/library/book/${book.id}`}>
                  <div className="relative h-[320px] w-full bg-zinc-100">
                    <Image
                      alt={book.title}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      src={book.cover}
                    />
                  </div>

                  <div className="p-3">
                    <h2 className="truncate text-base font-medium">{book.title}</h2>
                    <p className="truncate text-sm text-zinc-600">{book.author}</p>
                    <p className="mt-2 text-lg font-semibold text-emerald-700">
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
