import {Injectable} from '@angular/core';
import {HttpParams, HttpParamsOptions} from "@angular/common/http";
import {PostListSearchParams} from "../models/post/post.types";
import {Domains} from "../http/types";
import {HttpService} from "../http/http.service";
import {User, UserPayload} from "./user.types";
import {UserStorageService} from "../user-storage/user-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isStarted = false;
  constructor(private httpService: HttpService, private userStorage: UserStorageService) {
  }

  async start() {
    if (this.isStarted) return;

    await this.fetchList();
    this.isStarted = true;
  }

  async fetchById(id: string): Promise<User> {
    return this.httpService.get<User>(Domains.User + '/' + id)
      .then(user => {
        this.userStorage.updateUsersMap([user]);
        return user;
      })
  }

  async fetchList(searchParams?: PostListSearchParams): Promise<User[]> {
    const params = new HttpParams({
      fromObject: searchParams as unknown as HttpParamsOptions['fromObject']
    });
    const usersList = await this.httpService.get<User[]>(Domains.User, {params});
    this.userStorage.updateUsersMap(usersList);

    return usersList;
  }

  async fetchByLogin(login: string): Promise<User | undefined> {
    const users = await this.fetchList();
    return users.find(user => user.login === login);
  }

  create(userPayload: UserPayload): Promise<User> {
    return this.httpService.post<User>(Domains.User, userPayload)
      .then(user => {
        this.userStorage.updateUsersMap([user]);
        return user;
      })
  }
}
