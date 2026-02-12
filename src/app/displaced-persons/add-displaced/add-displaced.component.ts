import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../auth/validation.service';
import { AuthService } from '../../auth/auth.service';
import { finalize, map } from 'rxjs/operators';
import { DisplacedPersonsService } from '../displaced-persons.service';

@Component({
  selector: 'add-displaced',
  imports: [ReactiveFormsModule],
  templateUrl: './add-displaced.component.html',
  styleUrl: './add-displaced.component.css'
})
export class AddDisplacedComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  validationService = inject(ValidationService);
  displacedPersonsService = inject(DisplacedPersonsService)
  userId: string = '';

  onDisplacedPersonAdded = output<any>()
  errorMessage: string | null = null;

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    gender: ['', [Validators.required]],
    age: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
    phone: [null, [Validators.max(11111111111)]],
    employmentStatus: ['', [Validators.maxLength(14)]],
    occupation: ['', [Validators.minLength(4), Validators.maxLength(100)]],
    qualification: ['', [Validators.minLength(4), Validators.maxLength(100)]],
    maritalStatus: ['', [Validators.maxLength(8)]],
    numberOfChildren: [0, [Validators.min(0)]]
  })

  ngOnInit(): void {
    this.authService.user$.pipe(
      map((user) => {
        if(user) {
          this.userId = user.uid    
        }
      })
    )
  }

  onSubmit(): void {
    this.displacedPersonsService.isSubmitting.set(true);

    this.displacedPersonsService.addDisplacedPerson({...this.form.getRawValue(), addedBy: this.userId})
    .pipe(
      finalize(() => {
        this.displacedPersonsService.isSubmitting.set(false);
      })
    ).
    subscribe({
      complete: () => {
        this.onDisplacedPersonAdded.emit('')
      },
      error: (error) => {
        this.errorMessage = error.code;
      }
    })
  }
}
