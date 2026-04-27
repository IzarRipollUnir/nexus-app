'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { libraryService } from '@/lib/libraryService';
import type { Book } from '@/types';
import styles from './LibraryCartClient.module.css';

const initialBooks: Book[] = [
  {
    id: 1,
    title: 'Aprendiendo React',
    category: 'Ficción',
    year: 1990,
    description: '',
    ISBN: '',
    author: 'Juan Pérez',
    cover:
      'https://i0.wp.com/www.irinadelgado.com/wp-content/uploads/2020/04/herramienta-ejemplos-2.png?resize=376%2C600&ssl=1',
    price: 29.99,
  },
  {
    id: 2,
    title: 'TypeScript Avanzado',
    category: 'Ficción',
    year: 1990,
    description: '',
    ISBN: '',
    author: 'María García',
    cover:
      'https://i0.wp.com/www.irinadelgado.com/wp-content/uploads/2020/04/herramienta-ejemplos-2.png?resize=376%2C600&ssl=1',
    price: 39.95,
  },
];

type LibraryCartClientProps = {
  userId: number;
};

export function LibraryCartClient({ userId }: LibraryCartClientProps) {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const totalPrice = useMemo(
    () => books.reduce((sum, book) => sum + (book.price ?? 0), 0),
    [books]
  );

  const handleRemove = (bookId: number) => {
    setBooks((previousBooks) => previousBooks.filter((book) => book.id !== bookId));
  };

  const handlePurchase = async () => {
    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (books.length === 0) {
        setErrorMessage('Tu carrito está vacío.');
        return;
      }

      const bookIds = books.map((book) => book.id);
      await libraryService.purchaseBooks(userId, bookIds);
      setBooks([]);
      setSuccessMessage('Compra realizada con éxito.');
    } catch {
      setErrorMessage('Error al realizar la compra.');
    } finally {
      setSubmitting(false);
    }
  };

  if (books.length === 0 && !successMessage) {
    return (
      <section className={styles.root}>
        <button
          className={styles.backButton}
          onClick={() => router.back()}
          type="button"
        >
          Volver
        </button>
        <h2 className={styles.emptyTitle}>Tu carrito está vacío</h2>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <button
        className={styles.backButton}
        onClick={() => router.back()}
        type="button"
      >
        Volver
      </button>

      <h1 className={styles.title}>Carrito de Compras</h1>

      <p className={styles.user}>
        Usuario: {userId}
      </p>

      <hr className={styles.divider} />

      {errorMessage ? (
        <div className={styles.messageError}>
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className={styles.messageSuccess}>
          {successMessage}
        </div>
      ) : null}

      {books.map((book) => (
        <article className={styles.itemCard} key={book.id}>
          <div className={styles.coverWrap}>
            <Image alt={book.title} fill className={styles.coverImage} src={book.cover} />
          </div>
          <div className={styles.itemContent}>
            <h2 className={styles.itemTitle}>{book.title}</h2>
            <p className={styles.itemAuthor}>
              {book.author}
            </p>
            <p className={styles.itemPrice}>
              €{book.price?.toFixed(2) ?? '0.00'}
            </p>
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(book.id)}
              type="button"
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}

      <hr className={styles.divider} />

      <p className={styles.total}>
        Total: €{totalPrice.toFixed(2)}
      </p>

      <button
        className={styles.purchaseButton}
        disabled={submitting}
        onClick={handlePurchase}
        type="button"
      >
        {submitting ? 'Comprando...' : 'Comprar'}
      </button>
    </section>
  );
}
