import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SchedulerComponent } from './scheduler.component';

const routes = [
    {
        path     : 'scheduler',
        component: SchedulerComponent
    },
    {
        path     : '**',
        redirectTo: 'scheduler'
    }
];

@NgModule({
    declarations: [
        SchedulerComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        SchedulerComponent
    ]
})

export class SchedulerModule
{
}
