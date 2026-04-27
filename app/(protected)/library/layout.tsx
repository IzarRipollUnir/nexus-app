import { LibraryHeader } from './_components/LibraryHeader';

export default function LibraryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="w-full">
      <LibraryHeader />
      {children}
    </section>
  );
}
