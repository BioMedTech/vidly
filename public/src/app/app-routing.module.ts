import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AdminLayoutComponent} from "./shared/layouts/admin-layout/admin-layout.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {AdminComponent} from "./admin/admin.component";
import {AdminGenrePageComponent} from "./admin-genre-page/admin-genre-page.component";
import {RentalsPageComponent} from "./rentals-page/rentals-page.component";
import {CustomersPageComponent} from "./customers-page/customers-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'main', component: MainPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'customer', component: CustomersPageComponent}
    ]
  },
  {
    path: '', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'admin', component: AdminComponent},
      {path: 'admin/genres', component: AdminGenrePageComponent},
      {path: 'admin/rentals', component: RentalsPageComponent},
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})

export class AppRoutingModule {

}
