import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookamoorComponent } from './bookamoor.component';
import { BookingsModule } from '@app/bookings/bookings.module';




@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BookingsModule
       

    ],
    declarations: [
        BookamoorComponent
    ]
})
export class BookamoorModule { }


