import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

   markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach( (control: any ) => {
      control.markAsTouched();
  
      if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }


   validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean): void {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== 'invalid_characters') {
                formErrors[field] = formErrors[field];
              } else {
                formErrors[field] = formErrors[field];
              }
            }
          }
        }
      }
    }

    return formErrors;
  }
}
