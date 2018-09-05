import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {CustomerService} from "./shared/services/customer.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private auth: AuthService,
              private customerService: CustomerService) {

  }

  ngOnInit() {
    const potentialToken = localStorage.getItem('x-auth-token')
    if (potentialToken) {
      this.auth.setToken(potentialToken)
    }
    const customer = localStorage.getItem('customer-id')
    if (customer) {
      this.customerService.setCustomer(customer);
    }
  }
}
