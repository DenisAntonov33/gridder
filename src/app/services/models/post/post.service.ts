import {Injectable} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {Domains} from "../../http/types";
import {PostInput, PostCreationPayload, PostListSearchParams, PostOutput} from "./post.types";
import {HttpParams, HttpParamsOptions} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {PostModel} from "./post.model";
import {UserStorageService} from "../../user-storage/user-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpService: HttpService,
    private userStorage: UserStorageService,
    private authService: AuthService
  ) {
  }

  create(payload: PostCreationPayload): Promise<PostModel> {
    const author = this.authService.authUser$.value;

    if (!author) {
      throw new Error('Attempting to create post without authorization')
    }

    const creationDate = new Date().toISOString();
    const post: PostOutput = {
      ...payload,
      authorId: author.id,
      createdAt: creationDate,
    }
    return this.httpService.post<PostInput>(Domains.Post, post)
      .then(this.mapPost);
  }

  update(currentModel: PostModel, updatedPost: PostCreationPayload): Promise<PostModel> {
    const {
      authorLogin$,
      createdAt,
      id,
      ...oldPost
    } = currentModel;
    const newCreatedAt = createdAt.toISOString();
    const payload: PostOutput = {...oldPost, createdAt: newCreatedAt, ...updatedPost}
    return this.httpService.put<PostInput>(Domains.Post + '/' + id, payload)
      .then(this.mapPost);
  }

  fetchList(searchParams: PostListSearchParams): Promise<PostModel[]> {
    const params = new HttpParams({
      fromObject: searchParams as unknown as HttpParamsOptions['fromObject']
    });
    return this.httpService.get<PostInput[]>(Domains.Post, {params})
      .then(posts => posts.map(this.mapPost))
  }

  fetchById(id: string): Promise<PostModel> {
    return this.httpService.get<PostInput>(Domains.Post + '/' + id)
      .then(this.mapPost)
  }

  async delete(id: string) {
    return this.httpService.delete(Domains.Post + '/' + id);
  }

  private mapPost = (post: PostInput): PostModel => {
    return new PostModel(post, this.userStorage.usersMap$);
  }
}
