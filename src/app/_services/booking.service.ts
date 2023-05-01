import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';




@Injectable({
    providedIn: 'root' // what the other values instead of root?
  })
export class BookingService {
    constructor(private http: HttpClient) {}
    getAllBookings() {
        return this.http.get<any[]>(`${environment.apiUrl}/api/Bookings`);
    }

    getAllBookingsByUserId(userId:string | undefined) {
        const id = userId ? userId : '';
        return this.http.get<any[]>(`${environment.apiUrl}/api/Bookings/user/${id}`);
    }

    getAllBookingsByMooringId(mooringId:string | undefined) {
        const id = mooringId ? mooringId : '';
        return this.http.get<any[]>(`${environment.apiUrl}/api/Bookings/mooring/${id}`);
    }


    // https://localhost:7135/api/Bookings/user/a5d222a6-1303-413e-a4af-a6f9142ee213

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/Bookings/${id}`);
    }

    create(booking: any) {
        return this.http.post(`${environment.apiUrl}/api/Bookings`, booking);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/api/Bookings/putUpdateBookingAsync/${id}`, params);
            // .pipe(map(x => {
            //     // update stored user if the logged in user updated their own record
            //     if (id == this.userValue?.id) {
            //         // update local storage
            //         const user = { ...this.userValue, ...params };
            //         localStorage.setItem('user', JSON.stringify(user));

            //         // publish updated user to subscribers
            //         this.userSubject.next(user);
            //     }
            //     return x;
            // }));
    }




    deleteBooking(id: string) {
        console.warn(id);
        return this.http.delete(`${environment.apiUrl}/api/Bookings/deleteBookingAsync/${id}`);
            // .pipe(map(x => {
            //     // auto logout if the logged in user deleted their own record
            //     if (id == this.userValue?.id) {
            //         this.logout();
            //     }
            //     return x;
            // }));
    }
}