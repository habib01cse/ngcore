/* angular stuff */
import { NgModule } from '@angular/core';
import { AlertComponent } from '../popup/alert.component';
import { CommonModule } from '@angular/common';

/* 3rd party libraries */


@NgModule ({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent,
    ],
    exports: [
        AlertComponent
    ]
})
export class DialogModule { }