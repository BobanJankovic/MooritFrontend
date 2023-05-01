import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { BookamoorModule } from './bookamoor/bookamoor.module';
import { ProfileModule } from './profile/profile.module';
import { FormsModule } from '@angular/forms';
import { MooringDetailsModule } from './mooringDetails/mooringDetails.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        LeafletModule,
        BookamoorModule,
        ProfileModule,
        MooringDetailsModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
      
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };