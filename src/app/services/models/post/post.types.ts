import {Observable} from "rxjs";

export interface PostInput {
  id: string;
  title: string;
  text: string;
  authorId: string;
  createdAt: Date;
}

export interface Post extends PostInput {
  authorLogin$: Observable<string | null>;
}

export interface PostCreationPayload {
  title: string;
  text: string;
}

export interface PostOutput extends PostCreationPayload {
  authorId: string;
  createdAt: string;
}

export interface PostListSearchParams {
  page: number;
  limit: number;
}
