import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { MooringService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    moorings?: any[];
    isDeleting:boolean=false;
    constructor(private MooringService: MooringService) {}

    ngOnInit() {
        // this.accountService.getAll()
        //     .pipe(first())
        //     .subscribe(users => this.users = users);
        this.MooringService.getAllMoorings({startDate:'2023-03-18T21:06',endDate:'2023-03-20T21:06'}).subscribe((moorings) => {
            console.warn(moorings);
            return this.moorings = moorings
        });

    }

    deleteMooring(id: string) {
        // const user = this.moorings!.find(x => x.id === id);
        this.isDeleting = true;
        this.MooringService.deleteMooring(id)
            .pipe(first())
            .subscribe(() => this.moorings = this.moorings!.filter(x => x.id !== id));
    }
}