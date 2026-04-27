type LibraryCategoriesPageProps = {
  params: Promise<{ id: string }>;
};

import { notFound } from 'next/navigation';
import { libraryService } from '@/lib/libraryService';
import { LibraryCategoriesClient } from './LibraryCategoriesClient';

export default async function LibraryCategoriesPage({
  params,
}: LibraryCategoriesPageProps) {
  const { id } = await params;
  const [categories, books] = await Promise.all([
    libraryService.getCategories(),
    libraryService.getBookByCategory(id),
  ]);

  const category = categories.find((item) => String(item.id) === id);

  if (!category) {
    notFound();
  }

  return (
    <LibraryCategoriesClient
      categoryId={id}
      categoryName={category.name}
      initialBooks={books}
    />
  );
}
