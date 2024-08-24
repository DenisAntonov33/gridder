import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/models/post/post.service";
import {Observable} from "rxjs";
import {Post} from "../../services/models/post/post.types";

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
  postList$: Observable<Post[]> | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postList$ = this.postService.findAll();
  }
}
