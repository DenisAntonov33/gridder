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
  ) {
  }

  get isUserLoggedIn(): boolean {
    return !!this._authUser.value
  }

  async initialAuth() {
    try {
      const userId = this.getToken();
      if (!userId) return;

      const user = await this.userService.fetchById(userId);
      this.saveUserData(user);
    } catch (e) {
      console.debug('Initial auth failed with >>', e)
    }
  }

  async signUp(userPayload: UserPayload): Promise<void> {
    const user = await this.userService.create(userPayload);
    this.saveUserData(user);
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

      this.saveUserData(user);
    } catch (err) {
      console.debug(err);
      throw err;
    }
  }

  logout() {
    this.authUser$.next(null);
    this.storageService.removeItem(StorageKeys.Token);
  }

  async isLoginExist(login: string): Promise<boolean> {
    const user = await this.userService.fetchByLogin(login)
    return !!user
  }

  get authUser$(): BehaviorSubject<User | null> {
    return this._authUser
  }

  private saveUserData(user: User) {
    this._authUser.next(user);
    this.storageService.setItem(
      StorageKeys.Token,
      [user.id, user.login, user.password].join(AuthService.TOKEN_SEPARATOR)
    );
  }

  private getToken(): string | undefined {
    const tokenData = this.storageService.getItem<string>(StorageKeys.Token);
    if (!tokenData) return undefined;

    return tokenData.split(AuthService.TOKEN_SEPARATOR)?.[0];
  }
}
