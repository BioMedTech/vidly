import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  isCustomer:boolean=false;
  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.isCustomer=this.customerService.isCustomer()
  }

}
