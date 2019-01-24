import { Component, OnInit, OnDestroy } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormService } from './form-service';

@Component({
    selector: 'scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss'],
    providers: [DatePipe]
})
export class SchedulerComponent implements OnInit {


    form: FormGroup;
    today: Date;
    options: FormGroup;
    callType = ['call', 'person'];
    selected = 'Eastern Time (EST)';
    call = 'call';
    time = '07:00';
    scheduleForm: any;
    isValidForm: boolean;
    formErrors: any;
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
        datePipe: DatePipe
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
            date: {},
            type: {},
            time: {},
            timezone: {},
            note: {}
        };
    }


    ngOnInit(): void {
        this.form = this._formBuilder.group({
            date: ['', Validators.required],
            type: ['', Validators.required],
            time: ['', Validators.required],
            timezone: ['', Validators.required],
            note: ['', Validators.required]
        });    
    }

    onSubmit(): void {
        this._FormService.markFormGroupTouched(this.form);
        console.log(this.form.value);
        if (this.form.valid) {
            this.form.reset();
            this._route.navigateByUrl('thankyou');
        } else {
            this.formErrors = this._FormService.validateForm(this.form, this.formErrors, false);
        }
    }
}
