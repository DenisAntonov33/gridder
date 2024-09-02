import {Injectable} from '@angular/core';
import {HttpService} from "../../http/http.service";
import {Domains} from "../../http/types";
import {catchError, Observable} from "rxjs";
import {Post, PostListSearchParams} from "./post.types";
import {HttpParams, HttpParamsOptions} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpService: HttpService) {
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
