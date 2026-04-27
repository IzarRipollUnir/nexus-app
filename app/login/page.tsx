import { LoginFormClient } from './LoginFormClient';

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const redirectTo = next && next.startsWith('/') ? next : '/library';

  return <LoginFormClient redirectTo={redirectTo} />;
}
