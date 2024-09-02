import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgForOf} from '@angular/common';
import {PostsListComponent} from "./posts-list/posts-list.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {RouterLink} from "@angular/router";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {PostListItemComponent} from "./post-list-item/post-list-item.component";

@NgModule({
  declarations: [PostsListComponent, PostListItemComponent, PostPageComponent],
  imports: [
    CommonModule,
    NgForOf,
    AsyncPipe,
    DatePipe,
    RouterLink,
    MatPaginatorModule,
    MatPaginator
  ],
})
export class PostsModule {
}
