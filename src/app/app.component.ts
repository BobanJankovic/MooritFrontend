import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    // isAdmin:boolean | undefined;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
        // this.isAdmin =  this.accountService.userValue?.isAdmin;
    }

    get isAdmin() {
        return this.accountService.userValue?.isAdmin;
    }



    logout() {
        this.accountService.logout();
    }
}