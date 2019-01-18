import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector   : 'scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls  : ['./scheduler.component.scss'],
    providers: [DatePipe]
})
export class SchedulerComponent
{
   
    today: Date;
    options: FormGroup;
    callType = ['call', 'person'];
  
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        fb: FormBuilder,
        private _route: Router,
       datePipe: DatePipe
    )
    {
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
    }

    scheduleForm = new FormGroup({
        date: new FormControl('', Validators.required),
        type: new FormControl(''),
        time: new FormControl('', Validators.required),     
        note: new FormControl('', Validators.required)
      });

      onSubmit(): void{
        console.log(this.scheduleForm.value);       
        this._route.navigateByUrl('thankyou');
      }
}
