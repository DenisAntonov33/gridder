import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe, NgForOf} from '@angular/common';
import {PostsListComponent} from "./posts-list/posts-list.component";
import {PostPageComponent} from "./post-page/post-page.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [PostsListComponent, PostPageComponent],
  imports: [
    CommonModule,
    NgForOf,
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
})
export class PostsModule { }
