import { NextResponse } from 'next/server';
import { libraryService } from '@/lib/libraryService';

export async function GET() {
  const categories = await libraryService.getCategories();
  return NextResponse.json(categories);
}
