import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularWebStorageModule } from 'angular-web-storage';
import { SortComponent } from './sort/sort.component';
import { OnlineComponent } from './online/online.component';
import { SortableModule } from 'ngx-bootstrap/sortable';

@NgModule({
  declarations: [
    AppComponent,
    SortComponent,
    OnlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularWebStorageModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    SortableModule.forRoot()
   
  ],
  providers: [ { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
