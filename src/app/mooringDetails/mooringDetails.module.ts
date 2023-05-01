import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MooringDetailsComponent } from './mooringDetails.component';
import { BookingsModule } from '@app/bookings/bookings.module';



@NgModule({
    imports: [
        CommonModule,
        BookingsModule
    ],
    declarations: [
        MooringDetailsComponent
    ]
})
export class MooringDetailsModule { }


