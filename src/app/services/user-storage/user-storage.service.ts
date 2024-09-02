import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../user/user.types";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  readonly usersMap$: Observable<Map<string, User>>;
  private readonly _usersMap$: BehaviorSubject<Map<string, User>>;

  constructor() {
    this._usersMap$ = new BehaviorSubject<Map<string, User>>(new Map());
    this.usersMap$ = this._usersMap$.pipe();
  }

  updateUsersMap(users: User[]) {
    const currentMap = this._usersMap$.value;
    users.forEach(user => {
      currentMap.set(user.id, user);
    })
    this._usersMap$.next(currentMap);
  }
}
