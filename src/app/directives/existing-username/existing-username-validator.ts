import {Directive} from "@angular/core";
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
} from "rxjs";
import {UserService} from "../../services/user/user.service";
import {AuthService} from "../../services/auth/auth.service";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Directive({
  selector: '[loginExists]',
  standalone: true,
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true}]
})
export class ExistingUsernameValidatorDirective implements AsyncValidator {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return fromPromise(this.authService.isLoginExist(control.value)).pipe(
      distinctUntilChanged(),
      debounceTime(2000),
      map((isExists: boolean) => {
        return isExists ? {loginExists: true} : null;
      }),
      catchError((err) => {
        console.debug('err >>', err)
        return of(null);
      })
    );
  }
}
