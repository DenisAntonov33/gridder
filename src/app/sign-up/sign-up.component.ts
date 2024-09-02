import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ExistingUsernameValidatorDirective} from "../directives/existing-username/existing-username-validator";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule,
    ExistingUsernameValidatorDirective
  ],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent{
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  @ViewChild('signUpForm', {}) signUpForm!: NgForm;

  async onSubmit(form: NgForm) {
    if (form.invalid) return;

    try {
      await this.authService.signUp(form.value);
      await this.router.navigate(['posts']);
    } catch (e) {
      console.debug('Error on submit >>', e);
    }
  }
}
