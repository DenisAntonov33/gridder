import {Component, Input} from '@angular/core';
import {Post} from "../../services/models/post/post.types";

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.css'
})
export class PostListItemComponent {
  @Input({required: true}) post!: Post;
}
