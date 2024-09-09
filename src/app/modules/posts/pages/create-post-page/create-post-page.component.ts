import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";
import {PostService} from "../../../../services/models/post/post.service";
import {PostCreationPayload} from "../../../../services/models/post/post.types";

@Component({
  selector: 'create-post-page',
  templateUrl: './create-post-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostPageComponent {
  showAlert = false;

  constructor(private postService: PostService, private router: Router) {
  }

  async onSubmit(newPost: PostCreationPayload) {
    try {
      await this.postService.create(newPost);
      await this.router.navigate(['/posts/list'])
      this.showAlert && alert('Post was saved');
    } catch (err) {
      console.debug('err >>', err)
    }
  }
}
