import {Post, PostInput} from "./post.types";
import {map, Observable} from "rxjs";
import {User} from "../../user/user.types";

export class PostModel implements Post {
  authorLogin$: Observable<string | null>;
  authorId: string;
  createdAt: Date;
  id: string;
  text: string;
  title: string;

  constructor(postInput: PostInput, usersMap$: Observable<Map<string, User>>) {
    this.id = postInput.id;
    this.authorId = postInput.authorId;
    this.createdAt = postInput.createdAt;
    this.text = postInput.text;
    this.title = postInput.title;
    this.authorLogin$ = usersMap$.pipe(
      map(usersMap => usersMap.get(postInput.id)?.login ?? null)
    )
  }
}
