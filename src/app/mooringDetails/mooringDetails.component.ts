import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, BookingService } from '@app/_services';
import { User } from '@app/_models';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'mooringDetails.component.html' })
export class MooringDetailsComponent implements OnInit {
    bookings?: any[];
    isDeleting:boolean=false;
    user: User | null;
    

    constructor(
        private bookingService: BookingService,
        private accountService: AccountService,
        private route: ActivatedRoute,
       
    ) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.bookingService.getAllBookingsByMooringId(this.route.snapshot.params['id']).subscribe((bookings) => {
            console.warn(bookings);
            return this.bookings = bookings
        });

    }

    deleteMooring(id: string) {
        this.isDeleting = true;
        this.bookingService.deleteBooking(id)
            .pipe(first())
            .subscribe(() => this.bookings = this.bookings!.filter(x => x.id !== id));
    }
}

