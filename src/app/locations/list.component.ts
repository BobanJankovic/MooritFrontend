import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LocationService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    locations?: any[];
    isDeleting:boolean =false;
    constructor(private locationService: LocationService) {}

    ngOnInit() {
        // this.accountService.getAll()
        //     .pipe(first())
        //     .subscribe(users => this.users = users);
        this.locationService.getAllLocations().subscribe(locations => this.locations = locations);

    }

    deleteLocation(id: string) {
        // const user = this.locations!.find(x => x.id === id);
        this.isDeleting = true;
        this.locationService.deleteLocation(id)
            .pipe(first())
            .subscribe(() => { 
                this.isDeleting=false;
                return this.locations = this.locations!.filter((x) => x.id !== id)
            });
    }
}