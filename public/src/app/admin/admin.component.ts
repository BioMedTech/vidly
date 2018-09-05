import {Component, OnInit} from '@angular/core';
import {RentalService} from "../shared/services/rental.service";
import {CustomerService} from "../shared/services/customer.service";
import {Observable} from "rxjs/internal/Observable";
import {Customer, Rental} from "../shared/interfaces";
import {MovieService} from "../shared/services/movie.service";
import {Subscription} from "rxjs/internal/Subscription";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private rentalService: RentalService,
              private customerService: CustomerService,
              private auth: AuthService) {
  }

  aSub: Subscription;
  rentals: Rental[];
  customers: Customer[];
  CustomerNumber: number=0;
  rentalNumber: number=0;
  userNumber: number=0;

  ngOnInit() {
    this.aSub = this.rentalService.fetch().subscribe((rentals) => {
      this.rentals = rentals;
      this.rentalNumber=rentals.length;
    });
    this.aSub = this.customerService.fetch().subscribe((customers) => {
      this.customers = customers;
      const uniqueCustomer: string[]=[];
      customers.forEach(function (customer) {
        if (!uniqueCustomer.includes(customer.phone)){uniqueCustomer.push(customer.phone)}
      });
      this.CustomerNumber=uniqueCustomer.length;
    });
    this.aSub = this.auth.fetch().subscribe((users) => {
      this.userNumber=users.length;
    })
  }

}
