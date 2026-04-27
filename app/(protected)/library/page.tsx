import Image from 'next/image';
import Link from 'next/link';
import { libraryService } from '@/lib/libraryService';

export default async function LibraryHomePage() {
  const bestSellers = await libraryService.getBestSellers();

  return (
    <section className="w-full">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Library Home</h1>
          <p className="mt-1 text-zinc-600">Los 10 mas vendidos</p>
        </div>

        <div className="flex gap-3 text-sm">
          <Link className="underline" href="/library/historic">
            Mis compras
          </Link>
          <Link className="underline" href="/library/cart">
            Carrito
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {bestSellers.map((book) => (
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
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
    </section>
  );
}
