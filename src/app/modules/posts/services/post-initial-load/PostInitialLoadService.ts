import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild, GuardResult,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {AuthService} from "../../../../services/auth/auth.service";
import {UserService} from "../../../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class PostInitialLoadService implements CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GuardResult> {
    await Promise.all([
      this.authService.start(),
      this.userService.start(),
    ])

    return true;
  }
}
