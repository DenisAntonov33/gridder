import {Routes} from "@angular/router";
import {CreatePostPageComponent} from "./pages/create-post-page/create-post-page.component";
import {EditPostPageComponent} from "./pages/edit-post-page/edit-post-page.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";
import {PostsListComponent} from "./pages/posts-list/posts-list.component";
import {AuthGuardService} from "../../services/auth-guard/auth-guard.service"; // TODO should we move it to this module

export const postsRoutes: Routes = [
  {
    path: '', children: [
      {path: 'list', component: PostsListComponent, canActivate: [AuthGuardService]},
      {path: 'create', component: CreatePostPageComponent, canActivate: [AuthGuardService]},
      {path: 'edit/:id', component: EditPostPageComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: PostPageComponent},
    ]
  }
]

