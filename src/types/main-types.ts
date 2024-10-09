type Like = {
  id: string;
  userId: string;
  reviewId: string;
  createdAt: Date;
};

export type ReviewType = {
  id: string;
  userId: string;
  category: string;
  title: string;
  reviewContent: string;
  rating: number;
  likes: Like[];
  createdAt: Date;
};

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id: string;
};
