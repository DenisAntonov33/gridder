export interface Post {
  id: string;
  title: string;
  text: string;
  author: string;
  createdAt: Date;
}

export interface PostCreationPayload {
  title: string;
  text: string;
}

export interface PostPayload extends PostCreationPayload {
  author: string;
  createdAt: string;
}

export interface PostListSearchParams {
  page: number;
  limit: number;
}
