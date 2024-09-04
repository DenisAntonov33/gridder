import {Component, ViewChild} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  @ViewChild('signInForm', {}) signInForm!: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) return;

    try {
      await this.authService.signIn(form.value);
      form.controls['password']?.setErrors(null);
      await this.router.navigate(['/posts/list'], { replaceUrl: true });
    } catch (err) {
      console.debug('Error on submit >>', err);
      form.controls['password']?.setErrors({wrongCredentials: true});
    }
  }
}
