import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../shared/services/customer.service";
import {RentalService} from "../shared/services/rental.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Customer, Rental} from "../shared/interfaces";

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css']
})
export class CustomersPageComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private rentalService: RentalService) {
  }
  customer:Customer;
  rentals:Rental[];
  aSub: Subscription;

  ngOnInit() {
    const id = this.customerService.getCustomer();
    this.aSub=this.customerService.getById(id).subscribe(
      (customer)=>{this.customer=customer}
    );
    this.aSub=this.rentalService.getByCustomerId(id).subscribe(
      (rentals)=>{this.rentals=rentals})
  }
  getDays(date: Date){
    return this.rentalService.getDays(date);
  }

  selectRental(rental){

  }
}
