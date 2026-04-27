import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProtectedNavbar } from './_components/ProtectedNavbar';
import styles from './layout.module.css';

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
    <div className={styles.root}>
      <ProtectedNavbar userName={userName} />

      <main className={styles.main}>{children}</main>
    </div>
  );
}
