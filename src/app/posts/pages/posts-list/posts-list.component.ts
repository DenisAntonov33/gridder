import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/models/post/post.service";
import {BehaviorSubject, Observable} from "rxjs";
import {PostInput} from "../../../services/models/post/post.types";
import {PageEvent} from "@angular/material/paginator";
import {PostModel} from "../../../services/models/post/post.model";

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
  private readonly _postList$: BehaviorSubject<PostModel[]>;
  readonly postList$: Observable<PostModel[]> | null;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  postsCount = 50;
  pageIndex = 0;

  constructor(private postService: PostService) {
    this._postList$ = new BehaviorSubject<PostModel[]>([])
    this.postList$ = this._postList$;
  }

  async ngOnInit() {
    await this.fetchPosts();
  }

  handlePaginatorEvent(event: PageEvent) {
    const {pageIndex, pageSize} = event;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.fetchPosts();
  }

  private async fetchPosts(): Promise<void> {
    const posts = await this.postService.fetchList({limit: this.pageSize, page: this.pageIndex + 1});
    this._postList$.next(posts);
  }
}
