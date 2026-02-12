import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  validationService = inject(ValidationService);
  
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  errorMessage: string | null = null;

  onSubmit(): void {
    this.authService.isSubmitting.set(true);
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).
    pipe(
      finalize(() => {
        this.authService.isSubmitting.set(false)
      })
    ).
    subscribe({
      next: () => {
        this.router.navigateByUrl('/displaced');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    })
  }
}
