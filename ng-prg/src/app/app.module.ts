import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoodComponent } from './good/good.component';
import { SearchComponent } from './search/search.component';
import { BasketComponent } from './basket/basket.component';
import { DetailComponent } from './detail/detail.component';

import { HttpClientModule } from '@angular/common/http';
import { APIService } from './api.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ShorttextPipe } from './shorttext.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GoodComponent,
    SearchComponent,
    BasketComponent,
    DetailComponent,
    ShorttextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
