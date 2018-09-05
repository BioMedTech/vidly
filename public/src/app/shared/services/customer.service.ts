import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Customer, Rental} from "../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient){

  }
  customerId:string;

  fetch(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/customers')
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`/api/customers/${id}`)
  }
  setCustomer(id: string) {
    this.customerId = id;
  }

  isCustomer():boolean{
    return !!this.customerId
  }

  getCustomer(): string {
    return this.customerId
  }
  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>('/api/customers', customer)
      .pipe(
      tap(
        (customer) => {
          localStorage.setItem('customer-id', customer._id)
          this.setCustomer(customer._id)
        }
      )
    )
  }
  update(id: string, customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`/api/customers${id}`, customer)
  }
  delete(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`/api/customers${id}`)
  }
}
