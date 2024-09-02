import {Injectable} from '@angular/core';
import {HttpParams, HttpParamsOptions} from "@angular/common/http";
import {PostListSearchParams} from "../models/post/post.types";
import {BehaviorSubject, Observable} from "rxjs";
import {Domains} from "../http/types";
import {HttpService} from "../http/http.service";
import {User, UserPayload} from "./user.types";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly usersMap$: Observable<Map<string, User>>;
  private readonly _usersMap$: BehaviorSubject<Map<string, User>>;

  constructor(private httpService: HttpService) {
    this._usersMap$ = new BehaviorSubject<Map<string, User>>(new Map());
    this.usersMap$ = this._usersMap$.pipe();
  }

  async fetchList(searchParams?: PostListSearchParams): Promise<User[]> {
    const params = new HttpParams({
      fromObject: searchParams as unknown as HttpParamsOptions['fromObject']
    });
    const usersList = await this.httpService.get<User[]>(Domains.User, {params});
    this.updateUsersMap(usersList);

    return usersList;
  }

  async fetchByLogin(login: string): Promise<User | undefined> {
    const users = await this.fetchList();
    return users.find(user => user.login === login);
  }

  create(userPayload: UserPayload): Promise<User> {
    return this.httpService.post<User>(Domains.User, userPayload)
      .then(user => {
        this.updateUsersMap([user]);
        return user;
      })
  }

  private updateUsersMap(users: User[]) {
    const currentMap = this._usersMap$.value;
    users.forEach(user => {
      currentMap.set(user.id, user);
    })
    this._usersMap$.next(currentMap);
  }
}
