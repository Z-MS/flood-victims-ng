import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
	providedIn: 'root'
})

export class ValidationService {
	checkValidity(field: string, form: FormGroup) {
		let fieldControl = form.get(field);
		let fieldError = null;
		// force 'fullName' field to 'name' to avoid issues
		if (field === 'fullName') {
			field = 'name';
		}

		switch (field) {
			case 'email':
				fieldError = fieldControl?.hasError('email');
				break;
			case 'name':
				fieldError = fieldControl?.hasError('minlength') || fieldControl?.hasError('maxLength');
				break;
			case 'password':
				fieldError = fieldControl?.hasError('minlength');
				break;
			case 'repeatPassword':
				fieldError = fieldControl?.value !== form.get('password')?.value;
				break;
			case 'gender':
				fieldError = (fieldControl?.value.toLowerCase() !== "male") || (fieldControl?.value.toLowerCase() !== "female");
				break;
			case 'age':
				fieldError = fieldControl?.hasError('min') || fieldControl?.hasError('max');
				break;
			case 'phone':
				fieldError = fieldControl?.hasError('max');
				break;
			case 'employmentStatus':
				fieldError = fieldControl?.hasError('maxLength');
				break;
			case 'occupation':
				fieldError = fieldControl?.hasError('minLength') || fieldControl?.hasError('maxLength');
				break;
			case 'qualification':
				fieldError = fieldControl?.hasError('minLength') || fieldControl?.hasError('maxLength');
				break;
			case 'maritalStatus':
				fieldError = fieldControl?.hasError('maxLength');
				break;
			case 'numberOfChildren':
				fieldError = fieldControl?.hasError('min');
				break;
			default:
				fieldError = fieldControl?.hasError('required');
		}

		return fieldError! && (fieldControl?.touched || fieldControl?.dirty)!;
	}
}