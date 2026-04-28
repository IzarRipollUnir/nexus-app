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

export type CoworkingSpace = {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  description: string;
  occupied?: boolean;
  reservedBy?: string;
  startTime?: string;
  endTime?: string;
};

export type Reservation = {
  id: number;
  userId: string;
  spaceId: number;
  reservedBy: string;
  startTime: string;
  endTime: string;
  spaceName?: string;
};
