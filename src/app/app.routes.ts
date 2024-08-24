import {Routes} from '@angular/router';
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {PostPageComponent} from "./posts/post-page/post-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'posts', pathMatch: 'full'},
  {path: 'posts', component: PostsListComponent},
  {path: 'posts/:id', component: PostPageComponent},
];
