import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {filter, firstValueFrom, map, Observable, shareReplay, switchMap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {PostModel} from "../../../../services/models/post/post.model";
import {PostService} from "../../../../services/models/post/post.service";
import {PostCreationPayload} from "../../../../services/models/post/post.types";

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
})
export class EditPostPageComponent implements OnInit {
  post$!: Observable<PostModel>;

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.paramMap.pipe(
      map(map => map.get('id') ?? undefined),
      filter(id => typeof id === 'string'),
      switchMap<string, Observable<PostModel>>(id => fromPromise(this.postService.fetchById(id))),
      filter(user => !!user),
      shareReplay()
    )
  }

  async onSubmit(newPost: PostCreationPayload) {
    try {
      const postModel = await firstValueFrom(this.post$)
      await this.postService.update(postModel, newPost);
      await this.router.navigate(['/posts/list'])
    } catch (err) {
      console.debug('err >>', err)
    }
  }
}
