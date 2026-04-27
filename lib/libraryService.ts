import { api } from './api';
import type { Book, BookFilters, Category } from '@/types';

export const libraryService = {
  getBestSellers: () => api.get<Book[]>('/books/top'),

  getBookById: (id: string) => api.get<Book>(`/books/${id}`),

  getCategories: () => api.get<Category[]>('/categories'),

  getBookByCategory: (id: string) => api.get<Book[]>(`/categories/${id}/books`),

  getBooksWithFilters: (filters?: BookFilters) => {
    const params = new URLSearchParams();

    if (filters?.category) params.append('category', filters.category);
    if (filters?.author) params.append('author', filters.author);
    if (filters?.title) params.append('title', filters.title);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.priceMax) params.append('priceMax', filters.priceMax.toString());
    if (filters?.ISBN) params.append('ISBN', filters.ISBN);

    const queryString = params.toString();
    return api.get<Book[]>(`/books${queryString ? `?${queryString}` : ''}`);
  },

  getHistoric: (id: string) => api.get<Book[]>(`/users/${id}/purchase`),

  purchaseBooks: (userId: number, bookIds: number[]) => {
    return api.post<{ success: boolean; message?: string }>('/purchases', {
      userId,
      bookId: bookIds,
    });
  },
};
