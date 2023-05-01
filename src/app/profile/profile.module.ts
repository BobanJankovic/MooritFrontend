import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { BookingsModule } from '@app/bookings/bookings.module';




@NgModule({
    imports: [
        CommonModule,
        // ReactiveFormsModule,
        BookingsModule
       

    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule { }


