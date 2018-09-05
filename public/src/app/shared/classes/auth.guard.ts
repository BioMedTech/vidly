import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterState,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {of} from "rxjs/internal/observable/of";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {User} from "../interfaces";
import {MaterialService} from "./material.service";
import {state} from "@angular/animations";

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService,
              private router: Router) {

  }

  isAdmin: boolean;
  aSub: Subscription;

  canActivate(route: ActivatedRouteSnapshot, states: RouterStateSnapshot): Observable<boolean> {
    // this.aSub=this.auth.fetch().subscribe((user: User)=>{
    //   this.isAdmin=user.isAdmin},
    //   (err)=>{console.log(err)})

      if(this.auth.isAuthenitcated()){
      return of(true)
    }else{
      this.router.navigate(['/login'],{
        queryParams:{
          accessDenied:true
        }
      })
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state)
  }
}


