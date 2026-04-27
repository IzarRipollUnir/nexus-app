'use client';

import { useState } from 'react';
import { login } from '../actions/auth';
import styles from './LoginFormClient.module.css';

type LoginFormClientProps = {
  redirectTo: string;
};

export function LoginFormClient({ redirectTo }: LoginFormClientProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError('');

    if (!email || !password) {
      event.preventDefault();
      setError('Por favor, completa todos los campos');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Accede a Nexus</p>

          {error ? (
            <div className={styles.alert}>
              {error}
            </div>
          ) : null}

          <form action={login} className={styles.form} onSubmit={handleSubmit}>
            <input name="redirectTo" type="hidden" value={redirectTo} />

            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              required
            />

            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              required
            />

            <button
              className={styles.button}
              type="submit"
            >
              Iniciar Sesión
            </button>
          </form>
      </div>
    </div>
  );
}
