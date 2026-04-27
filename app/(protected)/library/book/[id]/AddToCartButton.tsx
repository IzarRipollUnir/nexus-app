'use client';

import { useEffect, useState } from 'react';
import styles from './AddToCartButton.module.css';

export function AddToCartButton() {
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!addedToCart) {
      return;
    }

    const timer = setTimeout(() => setAddedToCart(false), 3000);
    return () => clearTimeout(timer);
  }, [addedToCart]);

  return (
    <div className={styles.root}>
      {addedToCart ? (
        <p className={styles.success}>
          Libro anadido al carrito.
        </p>
      ) : null}

      <button
        className={styles.button}
        onClick={() => setAddedToCart(true)}
        type="button"
      >
        Anadir al carrito
      </button>
    </div>
  );
}
