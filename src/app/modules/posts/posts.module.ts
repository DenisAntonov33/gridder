import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgForOf} from '@angular/common';
import {PostsListComponent} from "./pages/posts-list/posts-list.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";
import {RouterLink, RouterModule} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {PostListItemComponent} from "./components/post-list-item/post-list-item.component";
import {CreatePostPageComponent} from "./pages/create-post-page/create-post-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {EditPostComponent} from "./components/edit-post/edit-post.component";
import {EditPostPageComponent} from "./pages/edit-post-page/edit-post-page.component";
import {postsRoutes} from "./posts.routes";
import {UnknownAuthorPipe} from "./pipes/unknown-author.pipe";

@NgModule({
  declarations: [
    PostsListComponent,
    PostListItemComponent,
    PostPageComponent,
    CreatePostPageComponent,
    EditPostPageComponent,
    EditPostComponent,
    UnknownAuthorPipe,
  ],
  imports: [
    RouterModule.forChild(postsRoutes),
    CommonModule,
    NgForOf,
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatPaginatorModule,
    MatPaginator,
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
})
export class PostsModule {
}
