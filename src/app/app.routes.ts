import {Routes} from '@angular/router';
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {PostPageComponent} from "./posts/post-page/post-page.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

export const routes: Routes = [
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'posts', component: PostsListComponent},
  {path: 'posts/:id', component: PostPageComponent},
];
