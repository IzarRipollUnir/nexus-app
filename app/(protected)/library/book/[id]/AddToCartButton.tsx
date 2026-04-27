'use client';

import { useEffect, useState } from 'react';

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
    <div>
      {addedToCart ? (
        <p className="mb-3 rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Libro anadido al carrito.
        </p>
      ) : null}

      <button
        className="rounded bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700"
        onClick={() => setAddedToCart(true)}
        type="button"
      >
        Anadir al carrito
      </button>
    </div>
  );
}
