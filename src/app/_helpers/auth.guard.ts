import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        console.warn(user?.isAdmin);
        console.warn(route.data.isAdmin)
        if (user) {
            if(route.data.isAdmin && !user?.isAdmin){
                 this.router.navigate(['/']);
                return false;
               
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    // canActivateAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const user = this.accountService.userValue;
    //     console.warn(user);
    //     if (user?.isAdmin) {
    //         // authorised so return true
    //         return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    //     return false;
    // }
}