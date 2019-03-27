import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { FormService } from './form-service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss'],
    providers: [AngularFirestore]
})
export class SchedulerComponent implements OnInit {


    form: FormGroup;
    today: Date;
    options: FormGroup;
    callType = ['call', 'person'];
    selected = 'EST';
    call = 'call';
    time = '08:00';
    scheduleForm: any;
    isValidForm: boolean;
    items: Observable<any[]>;
    formErrors: any;
    paramsArray: any;
    email = '';
    directorId = '';
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        public _FormService: FormService,
        private _route: Router,
        private paramsRouter: ActivatedRoute
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.today = new Date();
        this.formErrors = {
            email: {},
            // company: {},
            // phone: {},
            // address: {},
            type: {},
            time: {},
            timezone: {},
            note: {}
        };
    }


    ngOnInit(): void {
        this.form = this._formBuilder.group({
            date: [''],
            email: ['', Validators.email],
            company: [''],
            phone: [''],
            address: [''],
            type: ['', Validators.required],
            time: ['', Validators.required],
            timezone: ['', Validators.required],
            note: ['', Validators.required]
        });

        this.paramsRouter.queryParams
            .subscribe(params => {
                if (params.value) {
                    this.paramsArray = params.value.split(',');
                    this.directorId = this.paramsArray[1]; 
                    this.email = this.paramsArray[0];
                }
            });
    }

    onSubmit(): void {
        this.form.value.date = this.form.value.date.toString();
        this._FormService.markFormGroupTouched(this.form);
        if (this.form.valid) {
            this._FormService.addEmailAppointment(this.form.value, this.email, this.directorId).subscribe(result => {
                this.form.reset();
                this._route.navigateByUrl('thankyou');
            });
        } else {
            this.formErrors = this._FormService.validateForm(this.form, this.formErrors, false);
        }
    }
}
