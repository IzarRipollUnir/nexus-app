'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { libraryService } from '@/lib/libraryService';
import type { Book } from '@/types';

const initialBooks: Book[] = [
  {
    id: 1,
    title: 'Aprendiendo React',
    category: 'Ficción',
    year: 1990,
    description: '',
    ISBN: '',
    author: 'Juan Pérez',
    cover:
      'https://i0.wp.com/www.irinadelgado.com/wp-content/uploads/2020/04/herramienta-ejemplos-2.png?resize=376%2C600&ssl=1',
    price: 29.99,
  },
  {
    id: 2,
    title: 'TypeScript Avanzado',
    category: 'Ficción',
    year: 1990,
    description: '',
    ISBN: '',
    author: 'María García',
    cover:
      'https://i0.wp.com/www.irinadelgado.com/wp-content/uploads/2020/04/herramienta-ejemplos-2.png?resize=376%2C600&ssl=1',
    price: 39.95,
  },
];

type LibraryCartClientProps = {
  userId: number;
};

export function LibraryCartClient({ userId }: LibraryCartClientProps) {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const totalPrice = useMemo(
    () => books.reduce((sum, book) => sum + (book.price ?? 0), 0),
    [books]
  );

  const handleRemove = (bookId: number) => {
    setBooks((previousBooks) => previousBooks.filter((book) => book.id !== bookId));
  };

  const handlePurchase = async () => {
    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (books.length === 0) {
        setErrorMessage('Tu carrito está vacío.');
        return;
      }

      const bookIds = books.map((book) => book.id);
      await libraryService.purchaseBooks(userId, bookIds);
      setBooks([]);
      setSuccessMessage('Compra realizada con éxito.');
    } catch {
      setErrorMessage('Error al realizar la compra.');
    } finally {
      setSubmitting(false);
    }
  };

  if (books.length === 0 && !successMessage) {
    return (
      <Box className="mx-auto w-full max-w-4xl px-6 py-8">
        <Button onClick={() => router.back()} sx={{ mb: 3 }} variant="outlined">
          Volver
        </Button>
        <Typography variant="h5">Tu carrito está vacío</Typography>
      </Box>
    );
  }

  return (
    <Box className="mx-auto w-full max-w-4xl px-6 py-8">
      <Button onClick={() => router.back()} sx={{ mb: 3 }} variant="outlined">
        Volver
      </Button>

      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      <Typography sx={{ mb: 2 }} variant="body2" color="text.secondary">
        Usuario: {userId}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {errorMessage ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      ) : null}

      {books.map((book) => (
        <Card key={book.id} sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ position: 'relative', width: 120, minWidth: 120, height: 180 }}>
            <Image alt={book.title} fill className="object-cover" src={book.cover} />
          </Box>
          <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
            <Typography variant="subtitle1">{book.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {book.author}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              €{book.price?.toFixed(2) ?? '0.00'}
            </Typography>
            <IconButton
              color="error"
              onClick={() => handleRemove(book.id)}
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ mb: 2 }} variant="h6">
        Total: €{totalPrice.toFixed(2)}
      </Typography>

      <Button
        fullWidth
        color="primary"
        disabled={submitting}
        onClick={handlePurchase}
        variant="contained"
      >
        {submitting ? 'Comprando...' : 'Comprar'}
      </Button>
    </Box>
  );
}
