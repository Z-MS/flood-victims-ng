import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  validationService = inject(ValidationService);
  
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
  })

  errorMessage: string | null = null;
  actionSuccessful: boolean = false;

  onSubmit(): void {
    this.authService.isSubmitting.set(true);
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.password, rawForm.name).
    pipe(
      finalize(() => {
        this.authService.isSubmitting.set(false)
    })).
    subscribe({
      next: () => {
        this.actionSuccessful = true;
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    })
  }
}
