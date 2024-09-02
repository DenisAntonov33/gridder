import {Component} from '@angular/core';
import {PostService} from "../../../services/models/post/post.service";
import {PostCreationPayload} from "../../../services/models/post/post.types";
import {Router} from "@angular/router";

@Component({
  selector: 'create-post-page',
  templateUrl: './create-post-page.component.html',
})
export class CreatePostPageComponent {

  constructor(private postService: PostService, private router: Router) {
  }

  async onSubmit(newPost: PostCreationPayload) {
    try {
      await this.postService.create(newPost);
      await this.router.navigate(['/posts'])
    } catch (err) {
      console.debug('err >>', err)
    }
  }
}
