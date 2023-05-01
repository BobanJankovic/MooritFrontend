import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { BookamoorComponent } from './bookamoor';

import { AuthGuard } from './_helpers';
import { ProfileComponent } from './profile';
import { MooringDetailsComponent } from './mooringDetails';



﻿export enum Role {
    User = 'User',
    Admin = 'Admin'
}

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const mooringsModule = () => import('./moorings/moorings.module').then(x => x.MooringsModule);
const locationsModule = () => import('./locations/locations.module').then(x => x.LocationsModule);
const bookingsModule = () => import('./bookings/bookings.module').then(x => x.BookingsModule);
// const bookamoorModule = () => import('./bookings/bookings.module').then(x => x.BookamoorsModule);
// const homeModule = () => import('./home/home.module').then(x => x.HomeModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard],data: { isAdmin: false } },
    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'bookamoor', component: BookamoorComponent, canActivate: [AuthGuard],data: { isAdmin: false } },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],data: { isAdmin: false } },
    { path: 'mooringDetails/:id', component: MooringDetailsComponent, canActivate: [AuthGuard], data: { isAdmin: false } },
    { path: 'moorings', loadChildren: mooringsModule, canActivate: [AuthGuard],  data: { isAdmin: true } },
    { path: 'locations', loadChildren: locationsModule, canActivate: [AuthGuard],  data: { isAdmin: true } },
    { path: 'bookings', loadChildren: bookingsModule, canActivate: [AuthGuard], data: { isAdmin: true  } },
    { path: 'account', loadChildren: accountModule,data: { isAdmin: false } },

    // otherwise redirect to home 
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }