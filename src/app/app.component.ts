import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PostsModule} from "./posts/posts.module";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsModule, RouterLink, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gridder';
}
