import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostCreationPayload} from "../../../services/models/post/post.types";
import {PostModel} from "../../../services/models/post/post.model";

interface PostFormType {
  title: FormControl<string | null>;
  text: FormControl<string | null>;
}

@Component({
  selector: 'edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  postEditForm: FormGroup<PostFormType>;

  constructor(formBuilder: FormBuilder) {
    this.postEditForm = formBuilder.group({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    })
  }

  @Input() set post(post: PostModel | null) {
    if (!post) return;

    this.postEditForm.setValue({
      title: post.title,
      text: post.text,
    });
  };

  @Output() postSave = new EventEmitter<PostCreationPayload>();

  onSubmit() {
    this.postSave.emit(this.postEditForm.value as PostCreationPayload);
  }
}
