import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Injectable()
export class FormService {

  
  protected ASMX_URL_AddEmailAppointment = 'http://localhost:55833/wsPanel.asmx/addEmailAppointment_v02';

  constructor(private httpClient: HttpClient) { }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control: any) => {
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

  addEmailAppointment(data: any, clientEmail: any, DirectorId: any): Observable<any> {
    const formatDate  = moment(data.date).format('MM/DD/YYYY');
    const dateTime: any = moment(formatDate + ' ' + data.time);
    const dataContainer = {
      DirectorId: (DirectorId !== '') ? DirectorId : '000000',
      Clientemail: data.email.replace(/'/g, '`'),
      AppDate: dateTime._i,
      Notes: data.note.replace(/'/g, '`'),
      Company: data.company.replace(/'/g, '`'),
      Phone: data.phone,
      Address: data.address.replace(/'/g, '`'),
      TimeZone: data.timezone,
      AppType: data.type,
    };
    return this.httpClient.post(this.ASMX_URL_AddEmailAppointment, dataContainer);
  }
}
