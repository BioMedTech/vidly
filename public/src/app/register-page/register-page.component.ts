import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {MaterialService} from "../shared/classes/material.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  form: FormGroup;
  aSub: Subscription;

  ngOnInit() {
    MaterialService.updateTextInputs();
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    })
  }
  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.aSub=this.auth.register(this.form.value).subscribe(() => {
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
