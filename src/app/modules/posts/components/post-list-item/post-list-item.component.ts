import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PostModel} from "../../../../services/models/post/post.model";

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './post-list-item.component.css'
})
export class PostListItemComponent {
  @Input({required: true}) post!: PostModel;
}
