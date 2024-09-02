import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {User, UserPayload} from "../user/user.types";
import {StorageService} from "../storage/storage.service";
import {StorageKeys} from "../storage/storage.types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly TOKEN_SEPARATOR = '_||_';
  private readonly _authUser = new BehaviorSubject<User | null>(null);

  constructor(
    private userService: UserService,
    private storageService: StorageService,
  ) {}

  async signUp(userPayload: UserPayload): Promise<void> {
    const user = await this.userService.create(userPayload);
    this._authUser.next(user);
    this.storageService.set(StorageKeys.Token, [user.login, user.password].join(AuthService.TOKEN_SEPARATOR));
  }

  async signIn(userPayload: UserPayload): Promise<void> {
    try {
      const user = await this.userService.fetchByLogin(userPayload.login);

      if (!user) {
        throw new Error('User not found')
      }
      if (user.password !== userPayload.password) {
        throw new Error('Authorization failed')
      }

      this._authUser.next(user);
      this.storageService.set(StorageKeys.Token, [user.login, user.password].join(AuthService.TOKEN_SEPARATOR));
    } catch (err) {
      console.debug(err);
      throw err;
    }
  }

  async isLoginExist(login: string): Promise<boolean> {
    const user = await this.userService.fetchByLogin(login)
    return !!user
  }

  get authUser$(): BehaviorSubject<User | null> {
    return this._authUser
  }
}
