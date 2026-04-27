import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { libraryService } from '@/lib/libraryService';

export default async function LibraryHistoricPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value ?? '';
  const userId = sessionValue.match(/\d+/)?.[0] ?? '1';
  const books = await libraryService.getHistoric(userId);

  return (
    <section className="w-full">
      <h1 className="text-3xl font-semibold">Library Historic</h1>

      <p className="mt-2 text-zinc-600">Libros adquiridos previamente</p>

      {books.length === 0 ? (
        <p className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-zinc-700">
          Todavia no hay compras en el historico.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    src={book.cover}
                  />
                </div>

                <div className="p-3">
                  <h2 className="truncate text-base font-medium">{book.title}</h2>
                  <p className="truncate text-sm text-zinc-600">{book.author}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
