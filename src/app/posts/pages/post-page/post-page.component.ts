import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/models/post/post.service";
import {filter, map, Observable, shareReplay, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {PostModel} from "../../../services/models/post/post.model";

@Component({
  selector: 'post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit {
  postTitle$: Observable<string> | null = null;
  postText$: Observable<string> | null = null;
  postAuthor$: Observable<string> | null = null;
  postCreatedAt$: Observable<Date> | null = null;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
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
    this.postAuthor$ = post$.pipe(
      switchMap(post => post.authorLogin$),
      filter(Boolean)
    );
    this.postCreatedAt$ = post$.pipe(map(post => post.createdAt));
  }

  async editPost() {
    await this.router.navigate(['/edit-post', this.activatedRoute.snapshot.params['id']]);
  }

  async deletePost() {
    if (confirm('Are you sure?')) {
      const postId = this.activatedRoute.snapshot.params['id'];
      await this.postService.delete(postId);
      await this.router.navigate(['/posts']);
    }
  }
}
