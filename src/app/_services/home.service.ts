import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Mooring } from '@app/_models';

@Injectable({ providedIn: 'root' }) // what is this?
export class HomeService {
    constructor(private http: HttpClient) {}
    getAllMoorings({startDate,endDate}:{startDate:string,endDate:string}) {
        return this.http.get<any[]>(`${environment.apiUrl}/api/Moorings?startDate=${startDate}&endDate=${endDate}`);
    }
}