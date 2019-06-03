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

import {FormsModule} from'@angular/forms';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './components/profile/profile.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    
  ],
 // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})



export class AppModule { }
