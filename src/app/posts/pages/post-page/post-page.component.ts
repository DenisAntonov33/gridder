import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/models/post/post.service";
import {BehaviorSubject, filter, map, Observable, shareReplay, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {PostModel} from "../../../services/models/post/post.model";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit {
  postTitle$: Observable<string> | null = null;
  postText$: Observable<string> | null = null;
  postAuthor$: Observable<string> | null = null;
  postCreatedAt$: Observable<Date> | null = null;

  isEditing$ = new BehaviorSubject(false);

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const post$ = this.activatedRoute.paramMap.pipe(
      map(map => map.get('id') ?? undefined),
      filter(id => typeof id === 'string'),
      switchMap<string, Observable<PostModel>>(id => fromPromise(this.postService.fetchById(id))),
      shareReplay()
    )

    this.postTitle$ = post$.pipe(map(post => post.title));
    this.postText$ = post$.pipe(map(post => post.text));
    this.postAuthor$ = post$.pipe(map(post => post.authorId));
    this.postCreatedAt$ = post$.pipe(map(post => post.createdAt));
  }

  editPost() {
    this.isEditing$.next(true);
  }

}
