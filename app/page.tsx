import { cookies } from 'next/headers';
import { HomeClient } from './_components/HomeClient';
import { ProtectedNavbar } from './(protected)/_components/ProtectedNavbar';
import styles from './page.module.css';

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const isAuthenticated = Boolean(session?.value);
  const userName = session?.value ?? 'Usuario';

  return (
    <div className={styles.root}>
      <ProtectedNavbar userName={userName} />
      <main className={styles.main}>
        <HomeClient isAuthenticated={isAuthenticated} />
      </main>
    </div>
  );
}
