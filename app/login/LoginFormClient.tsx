'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { login } from '../actions/auth';

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Accede a Nexus
          </Typography>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}

          <form action={login} onSubmit={handleSubmit}>
            <input name="redirectTo" type="hidden" value={redirectTo} />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
              name="email"
              required
            />

            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              name="password"
              required
            />

            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
