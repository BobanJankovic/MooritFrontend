import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';




@Injectable({
    providedIn: 'root' // what the other values instead of root?
  })
export class LocationService {
    constructor(private http: HttpClient) {}
    getAllLocations() {
        return this.http.get<any[]>(`${environment.apiUrl}/api/Locations`);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/Locations/${id}`);
    }

    create(location: any) {
        return this.http.post(`${environment.apiUrl}/api/Locations`, location);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/api/Locations/putUpdateLocationAsync/${id}`, params);
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




    deleteLocation(id: string) {
        console.warn(id);
        return this.http.delete(`${environment.apiUrl}/api/locations/deleteLocationAsync/${id}`);
            // .pipe(map(x => {
            //     // auto logout if the logged in user deleted their own record
            //     if (id == this.userValue?.id) {
            //         this.logout();
            //     }
            //     return x;
            // }));
    }
}