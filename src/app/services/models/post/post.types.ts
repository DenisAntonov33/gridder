export interface Post {
  id: string;
  title: string;
  text: string;
  author: string;
  createdAt: Date;
}

export interface PostListSearchParams {
  page: number;
  limit: number;
}
