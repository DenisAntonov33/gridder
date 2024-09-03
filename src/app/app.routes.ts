import {Routes} from '@angular/router';
import {PostsListComponent} from "./posts/pages/posts-list/posts-list.component";
import {PostPageComponent} from "./posts/pages/post-page/post-page.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {CreatePostPageComponent} from "./posts/pages/create-post-page/create-post-page.component";
import {EditPostPageComponent} from "./posts/pages/edit-post-page/edit-post-page.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";

export const routes: Routes = [
  {path: '', redirectTo: 'posts', pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},

  {path: 'posts', component: PostsListComponent},
  {path: 'create-post', component: CreatePostPageComponent, canActivate: [AuthGuardService]},
  {path: 'edit-post/:id', component: EditPostPageComponent, canActivate: [AuthGuardService]},
  {path: 'posts/:id', component: PostPageComponent},
];
