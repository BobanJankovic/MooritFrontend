import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { BookingService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    bookings?: any[];
    isDeleting:boolean =false;
    constructor(private BookingService: BookingService) {}

    ngOnInit() {
        // this.accountService.getAll()
        //     .pipe(first())
        //     .subscribe(users => this.users = users);
        this.BookingService.getAllBookings().subscribe(bookings => this.bookings = bookings);

    }

    deleteBooking(id: string) {
        const user = this.bookings!.find(x => x.id === id);
        this.isDeleting = true;
        this.BookingService.deleteBooking(id)
            .pipe(first())
            .subscribe(() => {
                this.isDeleting = true;
                return this.bookings = this.bookings!.filter(x => x.id !== id)
            });
    }
}