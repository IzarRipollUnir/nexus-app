'use client';

export default function LibraryError({
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <section className="w-full rounded-xl border border-red-200 bg-red-50 p-6">
      <h1 className="text-2xl font-semibold text-red-800">No se pudo cargar la libreria</h1>
      <p className="mt-2 text-red-700">
        Revisa que la API simulada de Apidog este disponible y que los endpoints de
        <strong> /books/top </strong>
        respondan correctamente.
      </p>
      <button
        className="mt-4 rounded bg-red-700 px-4 py-2 font-medium text-white"
        onClick={reset}
        type="button"
      >
        Reintentar
      </button>
    </section>
  );
}
