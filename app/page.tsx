import { cookies } from 'next/headers';
import { HomeClient } from './_components/HomeClient';

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = Boolean(cookieStore.get('session')?.value);

  return <HomeClient isAuthenticated={isAuthenticated} />;
}
