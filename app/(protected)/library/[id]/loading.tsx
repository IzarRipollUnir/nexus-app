export default function LibraryCategoryLoading() {
  return (
    <section className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="h-[520px] animate-pulse rounded-xl border border-zinc-200 bg-zinc-100" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="h-[420px] animate-pulse rounded-xl border border-zinc-200 bg-zinc-100" key={index} />
        ))}
      </div>
    </section>
  );
}
