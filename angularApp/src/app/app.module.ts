import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { MenubarComponent } from './components/menubar/menubar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import {RouterModule, Routes} from '@angular/router';
import { BusmapsComponent } from './components/busmaps/busmaps.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';

import {FormsModule, ReactiveFormsModule} from'@angular/forms';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './components/profile/profile.component';
import {NgxPopper} from 'angular-popper';
import { AddChangeLinesComponent } from './components/add_change/add-change-lines/add-change-lines.component';
import { AgmCoreModule } from '@agm/core';
import { AddChangeStationsComponent } from './components/add_change/add-change-stations/add-change-stations.component';
import { AddChangeTimetableComponent } from './components/add_change/add-change-timetable/add-change-timetable.component';
import { AddChangePricelistComponent } from './components/add_change/add-change-pricelist/add-change-pricelist.component';
import { MapComponent } from './components/map/map.component';
import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
const Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "timetable",
    component: TimetableComponent
  },
  {
    path: "busmaps",
    component: BusmapsComponent
  },
  {
    path: "pricelist",
    component: PricelistComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "add_change_lines",
    component: AddChangeLinesComponent
  },
  {
    path: "add_change_stations",
    component: AddChangeStationsComponent
  },
  {
    path: "add_change_timetable",
    component: AddChangeTimetableComponent
  },
  {
    path: "add_change_pricelist",
    component: AddChangePricelistComponent
  },
  {
    path: "buy_a_ticket",
    component: BuyATicketComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomeComponent,
    TimetableComponent,
    BusmapsComponent,
    PricelistComponent,
    SigninComponent,
    RegisterComponent,
    ProfileComponent,
    AddChangeLinesComponent,
    AddChangeStationsComponent,
    AddChangeTimetableComponent,
    AddChangePricelistComponent,
    MapComponent,
    BuyATicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    NgxPopper,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
    
  ],
 // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})



export class AppModule { }
