'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const redirectToRaw = formData.get('redirectTo');
  const redirectTo =
    typeof redirectToRaw === 'string' && redirectToRaw.startsWith('/')
      ? redirectToRaw
      : '/library';
  const emailRaw = formData.get('email');
  const userName =
    typeof emailRaw === 'string' && emailRaw.includes('@')
      ? emailRaw.split('@')[0]
      : 'Usuario';

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'session',
    value: userName,
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
