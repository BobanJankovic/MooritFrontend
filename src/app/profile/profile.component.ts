import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, BookingService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit {
    bookings?: any[];
    isDeleting:boolean=false;
    user: User | null;

    constructor(
        private bookingService: BookingService,
        private accountService: AccountService,
    ) {
        this.user = this.accountService.userValue;
    }



    ngOnInit() {
        // this.accountService.getAll()
        //     .pipe(first())
        //     .subscribe(users => this.users = users);
        this.bookingService.getAllBookingsByUserId(this.user?.id).subscribe((bookings) => {
            console.warn(bookings);
            return this.bookings = bookings
        });

    }

    deleteMooring(id: string) {
        // const user = this.bookings!.find(x => x.id === id);
        this.isDeleting = true;
        this.bookingService.deleteBooking(id)
            .pipe(first())
            .subscribe(() => this.bookings = this.bookings!.filter(x => x.id !== id));
    }
}