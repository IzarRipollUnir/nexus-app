import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProtectedNavbar } from './_components/ProtectedNavbar';

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const userName = session?.value ?? 'Usuario';

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-full flex-col">
      <ProtectedNavbar userName={userName} />

      <main className="mx-auto flex w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
