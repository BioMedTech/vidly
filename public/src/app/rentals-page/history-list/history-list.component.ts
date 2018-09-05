import {Component, Input, OnInit} from '@angular/core';
import {Customer, Movie, Rental} from "../../shared/interfaces";
import {RentalService} from "../../shared/services/rental.service";
import {Subscription} from "rxjs/internal/Subscription";
import {AlertService} from "../../shared/classes/alert.service";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {
  @Input('rentals') rentals: Rental[];
  aSub: Subscription;
  customer: Customer;
  movie: Movie;

  constructor(private rentalService: RentalService) {
  }

  ngOnInit() {
  }

  selectRental(rental: Rental) {

  }

  getDays(date: Date){
    return this.rentalService.getDays(date);
  }



}
