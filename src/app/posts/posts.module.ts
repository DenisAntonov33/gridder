import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgForOf} from '@angular/common';
import {PostsListComponent} from "./pages/posts-list/posts-list.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";
import {RouterLink} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {PostListItemComponent} from "./components/post-list-item/post-list-item.component";
import {CreatePostPageComponent} from "./pages/create-post-page/create-post-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {EditPostComponent} from "./components/edit-post/edit-post.component";

@NgModule({
  declarations: [
    PostsListComponent,
    PostListItemComponent,
    PostPageComponent,
    CreatePostPageComponent,
    EditPostComponent
  ],
  imports: [
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
