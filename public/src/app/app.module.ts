import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MainPageComponent } from './main-page/main-page.component';
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { RentalsPageComponent } from './rentals-page/rentals-page.component';
import { AdminGenrePageComponent } from './admin-genre-page/admin-genre-page.component';
import { MoviesComponent } from './admin-genre-page/movies/movies.component';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { HistoryFilterComponent } from './rentals-page/history-filter/history-filter.component';
import { HistoryListComponent } from './rentals-page/history-list/history-list.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AdminComponent,
    AdminLayoutComponent,
    OverviewPageComponent,
    GenresPageComponent,
    RentalsPageComponent,
    AdminGenrePageComponent,
    MoviesComponent,
    ListMovieComponent,
    HistoryFilterComponent,
    HistoryListComponent,
    CustomersPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
