import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean | UrlTree {
    if (!this.authService.isUserLoggedIn) {
      this.router.navigate(['/signin']);
      return false;
    }

    return true;
  }
}
