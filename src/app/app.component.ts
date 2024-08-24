import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {PostsModule} from "./posts/posts.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gridder';
}
