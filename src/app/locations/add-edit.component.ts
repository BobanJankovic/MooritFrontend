import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, LocationService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
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
        private accountService: AccountService,
        private alertService: AlertService,
        private locationService: LocationService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            longitude: ['', Validators.required],
            latitude: ['', Validators.required],
        });

        this.title = 'Add Location';
        if (this.id) {
            // edit mode
            this.title = 'Edit Location';
            this.loading = true;
            this.locationService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
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
        this.saveLocation()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Location saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/locations');
                },
                error: (error: string) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveLocation() {
        // create or update user based on id param
        return this.id
            ? this.locationService.update(this.id!, this.form.value)
            : this.locationService.create(this.form.value);
    }
}