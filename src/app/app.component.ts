import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {AuthService} from "./services/auth/auth.service";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'gridder';

  constructor(private authService: AuthService, private userService: UserService) {
  }

  async ngOnInit() {
    await Promise.all([
      this.authService.initialAuth(),
      this.initialUsersLoading()
    ])
  }

  private async initialUsersLoading() {
    await this.userService.fetchList()
  }
}
