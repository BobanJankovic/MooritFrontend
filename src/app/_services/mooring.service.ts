import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs';




@Injectable({
    providedIn: 'root' // what the other values instead of root?
  })
export class MooringService {
    constructor(private http: HttpClient) {}
    getAllMoorings({startDate,endDate}:{startDate:string,endDate:string}) {
        return this.http.get<any[]>(`${environment.apiUrl}/api/Moorings?startDate=${startDate}&endDate=${endDate}`);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/Moorings/${id}`);
    }

    create(mooring: any) {
        return this.http.post(`${environment.apiUrl}/api/Moorings`, mooring);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/api/Moorings/putUpdateMooringAsync/${id}`, params);
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




    deleteMooring(id: string) {
        console.warn(id);
        return this.http.delete(`${environment.apiUrl}/api/Moorings/deleteMooringAsync/${id}`);
            // .pipe(map(x => {
            //     // auto logout if the logged in user deleted their own record
            //     if (id == this.userValue?.id) {
            //         this.logout();
            //     }
            //     return x;
            // }));
    }
}