export type Product = "line" | "x" | "ig" | "all";

export type Category =
  | "getting-started"
  | "use-cases"
  | "plugins"
  | "tips"
  | "api"
  | "changelog";

export type ArticleStatus = "draft" | "published" | "pinned";

export type UserRole = "member" | "maintainer" | "admin";

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: Category;
  product: Product;
  body: string;
  coverImage: string | null;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  tags: string[];
  status: ArticleStatus;
  upvotes: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  articleId: string;
  body: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  upvotes: number;
  createdAt: Date;
}

export interface WikiUser {
  uid: string;
  displayName: string;
  avatarUrl: string;
  githubUsername: string;
  role: UserRole;
  articleCount: number;
  joinedAt: Date;
}
