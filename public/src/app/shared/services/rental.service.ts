import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Customer, Rental} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class RentalService {

  constructor(private http: HttpClient){

  }

  fetch(params: any = {}): Observable<Rental[]> {
    return this.http.get<Rental[]>('/api/rentals',{
      params: new HttpParams({
        fromObject: params
      })
    })
  }
  getByCustomerId(id:string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/rentals/customer/${id}` )
  }

  getById(id: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/rentals/${id}`)
  }

  create(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>('/api/rentals', rental)
  }

  getDays(date: Date) {
    const now = new Date(Date.now());
    const newDate=new Date(date);
    const year = now.getFullYear() - newDate.getFullYear();
    const days = now.getDate() - newDate.getDate();
    return year * 365 + this.daysInMonths(newDate) + days+1;
  }

  daysInFebriary(year:number){
    if(year%4==0){
      return 29;
    }else {return 28}
  }

  daysInMonths(date: Date){
    const month=date.getMonth();
    const monthNow = new Date(Date.now()).getMonth();
    const days=0;
    for(let i=month; i<monthNow; i++){
      switch (i){
        case(1): days+31;
        case(2): this.daysInFebriary(date.getFullYear());
        case(3): days+31;
        case(4): days+30;
        case(5): days+31;
        case(6): days+30;
        case(7): days+31;
        case(8): days+31;
        case(9): days+30;
        case(10): days+31;
        case(11): days+30;
        case(12): days+31;
      }
    }
    return days;
  }
}
