import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Rental} from "../interfaces";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})

export class ReturnService {
  constructor(private http: HttpClient){}

  create(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>('/api/returns', rental)
  }
}
