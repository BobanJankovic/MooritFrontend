import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, BookingService } from '@app/_services';


@Component({   selector: 'app-root', templateUrl: './bookamoor.component.html', styleUrls: ['./bookamoor.component.css'], })
export class BookamoorComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private bookingService: BookingService,
        private alertService: AlertService
    ) { }



    ngOnInit() {
console.warn(this.route);
        const startDate = this.route.snapshot.queryParams['startDate'];
        const endDate = this.route.snapshot.queryParams['endDate'];
        const price = this.route.snapshot.queryParams['price'];
        const applicationUserModelId = this.route.snapshot.queryParams['applicationUserModelId'];
        const mooringId = this.route.snapshot.queryParams['mooringId'];


        console.warn(startDate,endDate,price,applicationUserModelId,mooringId);
       

        // form with validation rules
        this.form = this.formBuilder.group({
            startDate: [startDate, Validators.required],
            endDate: [endDate, Validators.required],
            price: [price, Validators.required],
            applicationUserModelId: [applicationUserModelId, Validators.required],
            mooringId: [mooringId, Validators.required],
          
        });

        this.title = 'Add Booking';
        if (this.id) {
            // edit mode
            this.title = 'Book a moor Booking';
            // this.loading = true;
            // this.bookingService.getById(this.id)
            //     .pipe(first())
            //     .subscribe(x => {
            //         this.form.patchValue(x);
            //         this.loading = false;
            //     });
        }
    }

      // convenience getter for easy access to form fields
      get f() { return this.form.controls; }
      // OKEJ
      onSubmit() {
          this.submitted = true;
  
          // reset alerts on submit
          this.alertService.clear();
  
          // stop here if form is invalid
          if (this.form.invalid) {
              return;
          }
  
          this.submitting = true;
          this.saveBooking()
              .pipe(first())
              .subscribe({
                  next: () => {
                      this.alertService.success('Booking saved', { keepAfterRouteChange: true });
                      this.router.navigateByUrl('/bookings');
                  },
                  error: (error: string) => {
                      this.alertService.error(error);
                      this.submitting = false;
                  }
              })
      }
  
      private saveBooking() {
          // create or update user based on id param
          return this.id
              ? this.bookingService.update(this.id!, this.form.value)
              : this.bookingService.create(this.form.value);
      }
}





