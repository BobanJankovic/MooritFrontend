import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const usersKey = 'angular-14-registration-login-example-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/Account/Login') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user: any) {
            const { id, username, firstName, lastName } = user;
            return { id, username, firstName, lastName };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};





// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", ".AspNetCore.Identity.Application=CfDJ8AfujLMb6fxGmw6-lkHS938mNR3AniU7KRD22r1Sbt9Q5VHO79bZ6Bjp-Tq8zuJNQOq11KqVmDjV1cwR7vYdLPZSpp8aiMPU_Hah0A9dQ-8DH83aoPsTOLAufK6pypn71GxChINtVycQmVvqFMpfJG8sSS6t3W6LuSxMTEOPuYoYkhQ0MmJCBzT4qxSd8NI8V3XqiZZOGrYFDugNIcGMmHtnUiUNruuCzviyFCiNbPxirLSXMz8PQwcyjcHrKku5P1bers3xNfEJNcI_CGHNtilG2FVvkYR-4L6QHwL17sxlPFBSE8GVO8leV_x9HCVwAcCHjIQtyjtigk-UUTXkKd4_OUd49oc3tdDJPdcm_gXpU0nNkFflUc3w6dIFk1mcDfnbItNoAVTLxT28B7x-MBdBG5nzkbE91UqpNltQD3F6Lh5AGPpK_mhA3knHUgttH4q4ReQ18cQ22_GqKtBVLWTaTxk01AKoa1ufy3UCfbTsAZHfrSfRoRZcNAtBKbniXv7wGqhR-VMtxejH8B_sR9Tlz2d6UgrJ5oSGOCZ1bbXxzacDyt394mLpDX_CBmbQvv9OHUSQiqjnsF3Hom_HbmbES752l5d9Od1n2KKRPcp4Rt_H5U-8BEDmTU9OtTMUqvMSceqUled5rr8k-DNC4OIVYSxA4w8XG4TJvqGeipi2q5G6xHe0j0iugcLtab4EKe69kg4FeezYQPxhP_Ji6uVV3k2t316fNU4KpbVrzAuF5Gb3R29qJ7PwexXHw5OTWaL7dHVUdWxX4ynUvnjItD5UrPf417yMyKeM3CRGSK2YXV6OaAap1i-zbuBvxBVB3E0Hhx97bY1NfIhJ3yjHRsPDwGYCtg6ZxgyVpZl-KsogKOw0HKcEEdSvukgaD30wRUr4ih1tKClGOXa_RKY5m9kJP2NzrZYWI5HXyLpkFNJduJCdcrfsGmTZOJugkyVYX8XtLVu37693HhHp69mW3Nrf_T4OC3_UnE0qR_kM_S6xHd_5OjTQg2qBb2LbII64O2nyjiB-vZZQDgR2Lix5k7BbOFYmYNhQS4d78As6o4H4");

// var raw = JSON.stringify({
//   "email": "boban0092@gmail.com",
//   "password": "INTcdrd2025BobanINTcdrd2025Bob@n"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://localhost:7135/api/Account/Login", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));