import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/models/post/post.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../../services/models/post/post.types";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
  private _postList$ = new BehaviorSubject<Post[]>([]);
  readonly postList$: Observable<Post[]> | null;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  postsCount = 50;
  pageIndex = 0;

  constructor(private postService: PostService) {
    this.postList$ = this._postList$.pipe();
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  handlePaginatorEvent(event: PageEvent) {
    const {pageIndex, pageSize} = event;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.postService.findAll({limit: this.pageSize, page: this.pageIndex + 1})
      .subscribe(posts => {
        this._postList$.next(posts);
      });
  }
}
