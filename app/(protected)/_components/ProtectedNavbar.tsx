'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/app/actions/auth';

type ProtectedNavbarProps = {
  userName?: string;
};

export function ProtectedNavbar({ userName }: ProtectedNavbarProps) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            component="button"
            onClick={() => router.push('/')}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '1.25rem',
            }}
            variant="h6"
          >
            NEXUS
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {isMobile ? (
              <IconButton aria-label="library" color="inherit" onClick={() => router.push('/library')}>
                <MenuBookIcon />
              </IconButton>
            ) : (
              <Button color="inherit" onClick={() => router.push('/library')} startIcon={<MenuBookIcon />}>
                Librería
              </Button>
            )}

            {isMobile ? (
              <IconButton aria-label="coworking" color="inherit" onClick={() => router.push('/coworking')}>
                <WorkIcon />
              </IconButton>
            ) : (
              <Button color="inherit" onClick={() => router.push('/coworking')} startIcon={<WorkIcon />}>
                Co-working
              </Button>
            )}

            {!isMobile ? (
              <Typography sx={{ ml: 1 }} variant="body2">
                {userName ?? 'Usuario'}
              </Typography>
            ) : null}

            <IconButton aria-label="logout" color="inherit" onClick={() => setLogoutModalOpen(true)}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog onClose={() => setLogoutModalOpen(false)} open={logoutModalOpen}>
        <DialogTitle>Cerrar sesión</DialogTitle>

        <DialogContent>
          <Typography>¿Estás seguro de que deseas cerrar sesión?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setLogoutModalOpen(false)}>Cancelar</Button>

          <form action={logout}>
            <Button aria-label="confirm-logout" color="error" type="submit" variant="contained">
              Cerrar sesión
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  );
}
