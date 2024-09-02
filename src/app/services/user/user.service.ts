import {Injectable} from '@angular/core';
import {HttpParams, HttpParamsOptions} from "@angular/common/http";
import {PostListSearchParams} from "../models/post/post.types";
import {lastValueFrom} from "rxjs";
import {Domains} from "../http/types";
import {HttpService} from "../http/http.service";
import {User, UserPayload} from "./user.types";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  fetchList(searchParams?: PostListSearchParams): Promise<User[]> {
    const params = new HttpParams({
      fromObject: searchParams as unknown as HttpParamsOptions['fromObject']
    });
    return lastValueFrom(this.httpService.get<User[]>(Domains.User, {params}))
  }

  async fetchByLogin(login: string): Promise<User | undefined> {
    const users = await this.fetchList();
    return users.find(user => user.login === login);
  }

  create(userPayload: UserPayload): Promise<User> {
    return this.httpService.post<User>(Domains.User, userPayload)
  }
}
