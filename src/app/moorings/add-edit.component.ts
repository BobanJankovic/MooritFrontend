import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService, MooringService, LocationService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    locations?: any[];


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private mooringService: MooringService,
        private locationService: LocationService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.locationService.getAllLocations().subscribe(locations => this.locations = locations);

        // form with validation rules
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            length: ['', Validators.required],
            width: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            price: ['', Validators.required],
            locationId: ['', Validators.required],
        });

        this.title = 'Add Mooring';
        if (this.id) {
            // edit mode
            this.title = 'Edit Mooring';
            this.loading = true;
            this.mooringService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    changeLocation(event: any) {
        console.warn(this.locations)
        console.warn(event.target.value)
        const ngReflectNgValue = event.target.getAttribute('ng-reflect-ng-value');
        console.log('ng-reflect-ng-value:', ngReflectNgValue);
      
        this.form.patchValue({
            locationId: event.target.value
          });
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
        this.saveMooring()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Mooring saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/moorings');
                },
                error: (error: string) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveMooring() {
        // create or update user based on id param
        return this.id
            ? this.mooringService.update(this.id!, this.form.value)
            : this.mooringService.create(this.form.value);
    }
}