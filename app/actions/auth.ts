'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const redirectToRaw = formData.get('redirectTo');
  const redirectTo =
    typeof redirectToRaw === 'string' && redirectToRaw.startsWith('/')
      ? redirectToRaw
      : '/library';

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'session',
    value: 'demo-user',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });

  redirect(redirectTo);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
