import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { finalize } from "rxjs";

@Component({
    imports: [ReactiveFormsModule],
    template: `
    <div class="container">
        <h2>Forgot Password</h2>
        @if(actionSuccessful) {
            <div class="success-panel">
                <p>A password reset link has been sent to your email address if it exists in our system.</p>
            </div>
        }
        @if(errorMessage) {
            <div class="error-panel">
            <p>An error occurred while processing your request. <span class="error-message">{{ errorMessage }}</span></p>
        </div>
        }
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form__container">
                <div>
                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="Your email" formControlName="email"
                    [class.invalid]="checkValidity('email')">
                    @if(checkValidity('email')) {
                        <span class="error-message">Enter a valid email address</span>
                    }
                </div>
                <div>
                    <button [disabled]="form.invalid  || authService.isSubmitting()" class="button submit__button" type="submit">
                        @if(form.invalid || (form.valid && !authService.isSubmitting())) {
                            Send Password Reset Link
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

export class ForgotPasswordComponent {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    actionSuccessful: boolean = false;
    errorMessage: string | null = null;

    form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]]
    })

    onSubmit(): void {
        this.authService.isSubmitting.set(true);
        this.authService.sendForgotPasswordEmail(this.form.getRawValue().email).
        pipe(
            finalize(()=> {
                this.authService.isSubmitting.set(false)
            })
        ).
        subscribe({
            complete: () => {
                this.actionSuccessful = true;
            },
            error: (error) => {
                this.errorMessage = error.code;
            }
        })
    }

    checkValidity(field: string): boolean {
        let fieldControl = this.form.get(field);
        
        return fieldControl?.hasError('email')! && (fieldControl?.touched || fieldControl?.dirty)!;
    }
}