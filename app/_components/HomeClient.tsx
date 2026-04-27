'use client';

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/navigation';

type HomeClientProps = {
  isAuthenticated: boolean;
};

export function HomeClient({ isAuthenticated }: HomeClientProps) {
  const router = useRouter();

  const services = [
    {
      title: 'Librería Universitaria',
      description: 'Accede a miles de libros y revistas académicas',
      icon: <MenuBookIcon sx={{ fontSize: 60 }} />,
      link: '/library',
      color: '#1976d2',
    },
    {
      title: 'Co-working',
      description: 'Reserva espacios de trabajo colaborativo',
      icon: <WorkIcon sx={{ fontSize: 60 }} />,
      link: '/coworking',
      color: '#2e7d32',
    },
    {
      title: 'Cafetería',
      description: 'Próximamente disponible',
      icon: <LocalCafeIcon sx={{ fontSize: 60 }} />,
      link: '#',
      color: '#ed6c02',
      disabled: true,
    },
    {
      title: 'Eventos',
      description: 'Próximamente disponible',
      icon: <EventIcon sx={{ fontSize: 60 }} />,
      link: '#',
      color: '#9c27b0',
      disabled: true,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Bienvenido a NEXUS
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Tu plataforma universitaria integral
        </Typography>
        {!isAuthenticated ? (
          <Button
            onClick={() => router.push('/login')}
            variant="contained"
            size="large"
            sx={{ bgcolor: 'white', color: '#667eea', '&:hover': { bgcolor: '#f5f5f5' } }}
          >
            Iniciar Sesión
          </Button>
        ) : null}
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Nuestros Servicios
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 4,
        }}
      >
        {services.map((service) => (
          <Box key={service.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                opacity: service.disabled ? 0.6 : 1,
                transition: 'transform 0.2s',
                '&:hover': service.disabled ? {} : { transform: 'translateY(-8px)' },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: service.color, mb: 2 }}>{service.icon}</Box>

                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>

                {!service.disabled && isAuthenticated ? (
                  <Button
                    onClick={() => router.push(service.link)}
                    variant="outlined"
                    sx={{ borderColor: service.color, color: service.color }}
                  >
                    Acceder
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
