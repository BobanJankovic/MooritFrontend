import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LeafletModule

    ]
})
export class HomeModule { }