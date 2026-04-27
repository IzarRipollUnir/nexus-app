'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/types';
import styles from './LibraryHeader.module.css';

export function LibraryHeader() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      setLoadingCategories(true);

      try {
        const response = await fetch('/api/library/categories', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('No se pudieron cargar las categorias');
        }

        const data: Category[] = await response.json();
        if (mounted) {
          setCategories(data);
        }
      } catch {
        if (mounted) {
          setCategories([]);
        }
      } finally {
        if (mounted) {
          setLoadingCategories(false);
        }
      }
    };

    void loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>Librería Universitaria</h1>

          <div className={styles.actions}>
            <button
              aria-label="home"
              className={styles.actionButton}
              onClick={() => router.push('/library')}
              type="button"
            >
              🏠
            </button>
            <button
              aria-label="shoppingcart"
              className={styles.actionButton}
              onClick={() => router.push('/library/cart')}
              type="button"
            >
              🛒
            </button>
            <button
              aria-label="historic"
              className={styles.actionButton}
              onClick={() => router.push('/library/historic')}
              type="button"
            >
              🕘
            </button>
            <button
              aria-label="menu"
              className={styles.actionButton}
              onClick={() => setDrawerOpen(true)}
              type="button"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {drawerOpen ? (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <aside className={styles.drawerPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <h2 className={styles.drawerTitle}>Categorias</h2>
              <button
                className={styles.drawerClose}
                onClick={() => setDrawerOpen(false)}
                type="button"
              >
                Cerrar
              </button>
            </div>

            <hr className={styles.divider} />

            {loadingCategories ? (
              <p className={styles.loadingText}>Cargando categorias...</p>
            ) : (
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li className={styles.categoryItem} key={category.id}>
                    <button
                      className={styles.categoryButton}
                      onClick={() => {
                        router.push(`/library/${category.id}`);
                        setDrawerOpen(false);
                      }}
                      type="button"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      ) : null}
    </>
  );
}
