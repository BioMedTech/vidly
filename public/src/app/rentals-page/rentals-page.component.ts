import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../shared/services/movie.service";
import {Filter, Rental} from "../shared/interfaces";
import {CustomerService} from "../shared/services/customer.service";
import {Subscription} from "rxjs/internal/Subscription";
import {RentalService} from "../shared/services/rental.service";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";

const STEP = 3;

@Component({
  selector: 'app-rentals-page',
  templateUrl: './rentals-page.component.html',
  styleUrls: ['./rentals-page.component.css']
})
export class RentalsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private rentalService: RentalService) {
  }
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip:MaterialInstance;
  aSub: Subscription;
  rentals: Rental[];
  isFilterVisible:boolean=false;
  offset = 0;
  limit = STEP;
  filter: Filter = {};

  loading = false;
  reloading = false;
  noMoreOrders = false;


  ngOnInit() {
      this.reloading = true;
      this.fetch()
    }

  private fetch() {
      const params = Object.assign({}, this.filter, {
        offset: this.offset,
        limit: this.limit
      });
      this.aSub = this.rentalService.fetch(params).subscribe(rentals => {
        this.rentals = this.rentals.concat(rentals);
        this.noMoreOrders = rentals.length < STEP;
        this.loading = false;
        this.reloading = false
      })
    }

    loadMore() {
      this.offset += STEP;
      this.loading = true;
      this.fetch()
    }


    ngAfterViewInit(){
   this.tooltip=MaterialService.initTooltip(this.tooltipRef)
  }
  ngOnDestroy() {
    this.tooltip.destroy();
    this.aSub.unsubscribe()
  }

  applyFilter(filter: Filter) {
    this.rentals = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

}
