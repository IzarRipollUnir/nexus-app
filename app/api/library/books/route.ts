import { NextResponse } from 'next/server';
import { libraryService } from '@/lib/libraryService';
import type { BookFilters } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: BookFilters = {};

  const category = searchParams.get('category');
  const author = searchParams.get('author');
  const title = searchParams.get('title');
  const year = searchParams.get('year');
  const priceMax = searchParams.get('priceMax');
  const ISBN = searchParams.get('ISBN');

  if (category) filters.category = category;
  if (author) filters.author = author;
  if (title) filters.title = title;
  if (year) filters.year = Number(year);
  if (priceMax) filters.priceMax = Number(priceMax);
  if (ISBN) filters.ISBN = ISBN;

  const books = await libraryService.getBooksWithFilters(filters);

  return NextResponse.json(books);
}
