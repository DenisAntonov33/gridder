import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'unknownAuthor'
})
export class UnknownAuthorPipe implements PipeTransform {
  transform(author: string | null): string {
    if (!author) return 'Unknown author';

    return author;
  }
}
