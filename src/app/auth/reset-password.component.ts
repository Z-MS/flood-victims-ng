import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { ValidationService } from "./validation.service";

@Component({
    imports: [ReactiveFormsModule],
    template: `
    <div class="container">
        <h2>Reset Password</h2>
        @if(errorMessage) {
            <div class="error-panel">
                <p>An error occured: <span class="error-message">{{ errorMessage }}</span></p>
            </div>
        }
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form__container">
                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Your password" formControlName="password"[class.invalid]="validationService.checkValidity('password', form)"/>
                    @if(validationService.checkValidity('password', form)) {
                        <span class="error-message">The password must be at least 8 characters long</span>
                    }
                </div>
                <div>
                    <label for="repeatPassword">Repeat Password</label>
                    <input id="repeatPassword" type="password" placeholder="Repeat your password" formControlName="repeatPassword"[class.invalid]="validationService.checkValidity('repeatPassword', form)"/>
                    @if(validationService.checkValidity('repeatPassword', form)) {
                        <span class="error-message">The passwords do not match</span>
                    }
                </div>
                <div>
                    <button [disabled]="form.invalid  || authService.isSubmitting()" class="button submit__button" type="submit">
                        @if(form.invalid || (form.valid && !authService.isSubmitting())) {
                            Reset Password
                        } @else {
                            Submitting...
                        }
                    </button>
                </div>
            </div>
        </form>
    </div>
    `
})

export class ResetPasswordComponent implements OnInit {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);
    validationService = inject(ValidationService)

    form = this.fb.nonNullable.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    })

    errorMessage: string | null = null;

    code: string | null = null;

    ngOnInit(): void {
        this.code = history.state?.['code'];
    }

    onSubmit(): void {
      this.authService.isSubmitting.set(true);
      this.authService.resetPassword(this.code!, this.form.get('password')!.value).
      pipe(
          finalize(() => {
              this.authService.isSubmitting.set(false)
      })).
      subscribe({
          next: () => {
              this.router.navigateByUrl('/signin');
          },
          error: (err) => {
              this.errorMessage = err.code;
          }
      })
    }
}