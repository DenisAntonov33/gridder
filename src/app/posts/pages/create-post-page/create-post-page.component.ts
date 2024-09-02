import {Component} from '@angular/core';
import {PostService} from "../../../services/models/post/post.service";
import {PostCreationPayload} from "../../../services/models/post/post.types";

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
})
export class CreatePostPageComponent {

  constructor(private postService: PostService) {
  }

  async onSubmit(newPost: PostCreationPayload) {
    try {
      await this.postService.create(newPost);
    } catch (err) {
      console.debug('err >>', err)
    }
  }
}
