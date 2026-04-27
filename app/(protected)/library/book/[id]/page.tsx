import Image from 'next/image';
import Link from 'next/link';
import { libraryService } from '@/lib/libraryService';
import { AddToCartButton } from './AddToCartButton';

type BookDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = await libraryService.getBookById(id);

  return (
    <section className="w-full">
      <Link
        className="mb-5 inline-flex rounded border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100"
        href="/library"
      >
        Volver
      </Link>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(260px,340px)_1fr]">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative h-[560px] w-full">
            <Image alt={book.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 340px" src={book.cover} />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{book.title}</h1>
          <p className="mt-1 text-xl text-zinc-600">{book.author}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {book.category ? (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {book.category}
              </span>
            ) : null}
            {book.year ? (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                {book.year}
              </span>
            ) : null}
          </div>

          <p className="mt-6 text-3xl font-semibold text-emerald-700">
            {new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
            }).format(book.price)}
          </p>

          <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-[180px_1fr]">
            <dt className="font-semibold text-zinc-700">ISBN</dt>
            <dd className="text-zinc-800">{book.ISBN ?? 'No disponible'}</dd>

            <dt className="font-semibold text-zinc-700">Año de publicacion</dt>
            <dd className="text-zinc-800">{book.year ?? 'No disponible'}</dd>
          </dl>

          <h2 className="mt-8 text-xl font-semibold">Descripcion</h2>
          <p className="mt-2 whitespace-pre-line text-zinc-700">
            {book.description ?? 'Sin descripcion disponible.'}
          </p>

          <div className="mt-8">
            <AddToCartButton />
          </div>
        </div>
      </div>
    </section>
  );
}
