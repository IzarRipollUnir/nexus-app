export type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  price: number;
  year?: number;
  category?: string;
  ISBN?: string;
  description?: string;
};

export type Category = {
  id: number | string;
  name: string;
};

export type BookFilters = {
  category?: string;
  author?: string;
  title?: string;
  year?: number;
  priceMax?: number;
  ISBN?: string;
};
