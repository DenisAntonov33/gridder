import { Injectable } from '@angular/core';
import {HttpService} from "../../http/http.service";
import {Domains} from "../../http/types";
import {catchError, Observable} from "rxjs";
import {Post} from "./post.types";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpService: HttpService) {}

  findAll(): Observable<Post[]> {
    return this.httpService.get<Post[]>(Domains.Post).pipe(
      catchError((err, caught) => {
        return caught;
      })
    )
  }

  findById(id: string): Observable<Post> {
    return this.httpService.get<Post>(Domains.Post + '/' + id).pipe(
      catchError((err, caught) => {
        console.log('err >>', err)
        return caught;
      })
    )
  }

  test() {
    const a = this.findAll()
  }
}
