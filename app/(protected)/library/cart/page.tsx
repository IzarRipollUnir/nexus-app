import { cookies } from 'next/headers';
import { LibraryCartClient } from './LibraryCartClient';

export default async function LibraryCartPage() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value ?? '';
  const userId = Number(sessionValue.match(/\d+/)?.[0] ?? 1);

  return <LibraryCartClient userId={Number.isNaN(userId) ? 1 : userId} />;
}
