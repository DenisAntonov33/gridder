import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {map, Observable} from "rxjs";
import {AsyncPipe, TitleCasePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    UpperCasePipe,
    RouterLinkActive,
    TitleCasePipe
  ],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  login$: Observable<string | undefined>;

  constructor(private authService: AuthService) {
    this.login$ = authService.authUser$.pipe(map(user => user?.login))
  }

  logout() {
    this.authService.logout();
    location.href = 'signin';
  }
}
