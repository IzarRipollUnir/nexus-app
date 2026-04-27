'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import type { Category } from '@/types';

const DRAWER_WIDTH = 240;

export function LibraryHeader() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      setLoadingCategories(true);

      try {
        const response = await fetch('/api/library/categories', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('No se pudieron cargar las categorias');
        }

        const data: Category[] = await response.json();
        if (mounted) {
          setCategories(data);
        }
      } catch {
        if (mounted) {
          setCategories([]);
        }
      } finally {
        if (mounted) {
          setLoadingCategories(false);
        }
      }
    };

    void loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', mb: 3 }}>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="temporary"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Categorías
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loadingCategories ? (
            <CircularProgress size={24} />
          ) : (
            <List>
              {categories.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push(`/library/${category.id}`);
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="h4">Librería Universitaria</Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            aria-label="home"
            color="inherit"
            edge="start"
            onClick={() => router.push('/library')}
          >
            <HomeIcon />
          </IconButton>

          <IconButton
            aria-label="shoppingcart"
            color="inherit"
            edge="start"
            onClick={() => router.push('/library/cart')}
          >
            <ShoppingCartIcon />
          </IconButton>

          <IconButton
            aria-label="historic"
            color="inherit"
            edge="start"
            onClick={() => router.push('/library/historic')}
          >
            <HistoryIcon />
          </IconButton>

          <IconButton aria-label="menu" color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
