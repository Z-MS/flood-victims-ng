import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fb = inject(FormBuilder);
  // http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
  })

  errorMessage: string | null = null;

  onSubmit(): void {
    this.authService.isSubmitting.set(true);
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.password, rawForm.name).
    subscribe({
      next: () => {
        this.router.navigateByUrl('/signin');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
      complete: () => { 
        this.authService.isSubmitting.set(false);
      }
    })
  }

  checkValidity(field: string): boolean {
    let fieldControl = this.form.get(field);
    let fieldError = null;
    switch (field) {
      case 'email':
        fieldError = fieldControl?.hasError('email');
        break;
      case 'name':
        fieldError = fieldControl?.hasError('minlength');
        break;
      case 'password':
        fieldError = fieldControl?.hasError('minlength');
        break;
      case 'repeatPassword':
        fieldError = fieldControl?.value !== this.form.get('password')?.value;
        break;
      default:
        fieldError = fieldControl?.hasError('required');
    }
    return fieldError! && (fieldControl?.touched || fieldControl?.dirty)!;
  }
}
