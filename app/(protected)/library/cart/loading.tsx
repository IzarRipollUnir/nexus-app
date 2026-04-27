export default function LibraryCartLoading() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-8">
      <div className="h-10 w-40 animate-pulse rounded bg-zinc-200" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div className="h-40 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100" key={index} />
        ))}
      </div>
    </section>
  );
}
