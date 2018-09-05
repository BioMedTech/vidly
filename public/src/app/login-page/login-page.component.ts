import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaterialService} from "../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  form: FormGroup;
  aSub: Subscription;

  ngOnInit() {
    MaterialService.updateTextInputs();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }
  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.aSub=this.auth.login(this.form.value).subscribe(() => {
        this.router.navigate(['/main'], {
            queryParams: {
              registered: true
            }
          }
        )
      },
      error => {
        MaterialService.toast(error.error.message)
      })
  }

}
