import {Injectable} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {Domains} from "../../http/types";
import {catchError, Observable} from "rxjs";
import {Post, PostCreationPayload, PostListSearchParams, PostPayload} from "./post.types";
import {HttpParams, HttpParamsOptions} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {
  }

  create(payload: PostCreationPayload): Promise<Post> {
    const creationDate = new Date().toISOString();
    const author = this.authService.authUser$.value;

    if (!author) {
      throw new Error('Attempting to create post without authorization')
    }

    const post: PostPayload = {
      ...payload,
      author: author.id,
      createdAt: creationDate,
    }
    return this.httpService.post<Post>(Domains.Post, post);
  }

  fetchList(searchParams: PostListSearchParams): Observable<Post[]> {
    const params = new HttpParams({
      fromObject: searchParams as unknown as HttpParamsOptions['fromObject']
    });
    return this.httpService.get<Post[]>(Domains.Post, {params}).pipe(
      catchError((err, caught) => {
        return caught;
      })
    )
  }

  fetchById(id: string): Observable<Post> {
    return this.httpService.get<Post>(Domains.Post + '/' + id).pipe(
      catchError((err, caught) => {
        console.log('err >>', err)
        return caught;
      })
    )
  }
}
