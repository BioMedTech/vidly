import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../shared/services/movie.service";
import {Observable} from "rxjs/internal/Observable";
import {Movie, Rental} from "../shared/interfaces";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {CustomerService} from "../shared/services/customer.service";
import {AlertService} from "../shared/classes/alert.service";
import {RentalService} from "../shared/services/rental.service";


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('modal') modalRef: ElementRef;
  @Input('genreId') genreId: string;

  modal: MaterialInstance;
  movies: Movie[];
  form: FormGroup;
  movie: Movie;
  aSub: Subscription;

  constructor(private movieService: MovieService,
              private  route: Router,
              private customerService: CustomerService,
              private rentalService: RentalService) {
  }
  ngOnChanges(){
    this.movieService.getByGenreId(this.genreId).subscribe(movies => {
        this.movies = movies
      },
      (err) => {
        MaterialService.toast(err.error)
      })
  }
  ngOnInit() {
    this.form=new FormGroup({
      name:new FormControl(null, [Validators.required]),
      phone:new FormControl(null, [Validators.required]),
      isGold:new FormControl(false)
    })
  }
  ngAfterViewInit(){
    this.modal=MaterialService.initModal(this.modalRef);
    MaterialService.updateTextInputs()
  }
  onRent(movie: Movie) {
    this.modal.open();
    this.movie = movie;
  }
  onSumbit(){
     this.aSub=this.customerService.create(this.form.value).subscribe((customer)=>{
       const newRental:Rental={
         customerId: customer._id,
         movieId: this.movie._id
       };
       console.log(newRental.customerId, newRental.movieId);
       this.aSub=this.rentalService.create(newRental).subscribe(()=>{
         this.modal.close();
         AlertService.swal('You successfully rent a movie', '', 'success');
       }, (error)=>AlertService.swal('Something when wrong', 'You can try to rent a movie again', 'error'))
     }, (error)=>AlertService.swal('Something when wrong', 'You can try to rent a movie again', 'error'))
  }

}
