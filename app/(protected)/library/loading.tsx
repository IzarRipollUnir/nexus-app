export default function LibraryLoading() {
  return (
    <section className="w-full">
      <h1 className="mb-6 text-3xl font-semibold">Library Home</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="animate-pulse overflow-hidden rounded-xl border border-zinc-200"
            key={index}
          >
            <div className="h-[320px] bg-zinc-200" />
            <div className="space-y-2 p-3">
              <div className="h-4 rounded bg-zinc-200" />
              <div className="h-4 w-2/3 rounded bg-zinc-200" />
              <div className="h-5 w-1/3 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
