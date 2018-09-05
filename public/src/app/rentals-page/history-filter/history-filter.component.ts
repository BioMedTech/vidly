import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MaterialDatepicker, MaterialService} from "../../shared/classes/material.service";
import {Filter} from "../../shared/interfaces";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  start: MaterialDatepicker;
  end: MaterialDatepicker;
  rental: number;
  isValid = false;


  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }

  ngOnDestroy() {
  this.start.destroy();
  this.end.destroy();
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return
    }

    this.isValid = this.start.date < this.end.date
  }

  submitFilter() {

    const filter: Filter = {}

    if (this.rental) {
      filter.rental = this.rental
    }

    if (this.start.date) {
      filter.start = this.start.date
    }

    if (this.end.date) {
      filter.end = this.end.date
    }

    this.onFilter.emit(filter)
  }

}