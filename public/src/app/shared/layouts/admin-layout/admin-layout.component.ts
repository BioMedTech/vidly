import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private auth:AuthService,
              private router:Router) {
  }
  links=[
    {url: '/admin', name:'Dashboard'},
    {url: '/admin/genres', name:'Genres and films'},
    {url: '/admin/rentals', name:'Rentals'}
  ];
  ngOnInit() {
  }

  logout(event: Event){
    event.preventDefault();
    this.auth.logOut()
    this.router.navigate(['/main'])
  }
}
