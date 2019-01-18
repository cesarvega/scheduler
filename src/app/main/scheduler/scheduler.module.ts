import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatListModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatAutocompleteModule, MatTabsModule} from '@angular/material';
import { SchedulerComponent } from './scheduler.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes = [
    {
        path     : 'scheduler',
        component: SchedulerComponent
    },
    {
        path     : 'thankyou',
        component: ThankYouComponent
    },
    {
        path     : '**',
        redirectTo: 'scheduler'
    }
];

@NgModule({
    declarations: [
        SchedulerComponent,
        ThankYouComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,

         // Material
         MatButtonModule,
         MatCheckboxModule,
         MatDialogModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatMenuModule,
         MatRippleModule,
         MatSelectModule,
         MatToolbarModule,
         MatRadioModule,
         MatListModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatMomentDateModule,
         MatSelectModule,
         MatOptionModule,
         MatCheckboxModule,
         MatRadioModule,
         MatAutocompleteModule,
         MatTabsModule
    ],
    exports     : [
        SchedulerComponent
    ]
})

export class SchedulerModule
{
}
