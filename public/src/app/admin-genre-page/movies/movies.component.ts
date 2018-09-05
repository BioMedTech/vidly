import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";
import {Movie} from "../../shared/interfaces";
import {MovieService} from "../../shared/services/movie.service";
import {AlertService} from "../../shared/classes/alert.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})


export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef;
  @Input('genreId') genreId: string;

  constructor(private movieService: MovieService) {
  }

  movies: Movie[] = [];
  movieId = null;
  modal: MaterialInstance;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      dailyRentalRate: new FormControl(null, [Validators.required]),
      numberInStock: new FormControl(null, [Validators.required])
    });
    this.movieService.getByGenreId(this.genreId).subscribe(movies => {
        this.movies = movies
      },
      (err) => {
        MaterialService.toast(err.message)
      })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectMovie(movie: Movie) {
    this.movieId = movie._id;
    this.form.patchValue({
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      numberInStock: movie.numberInStock
    });

    this.modal.open();
    MaterialService.updateTextInputs()
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  onAddMovie() {
    this.movieId = null;
    this.form.reset({title: null, cost: 1})
    this.modal.open();
    MaterialService.updateTextInputs()
  }

  onDeleteMovie($event: Event, movie: Movie) {
    $event.stopPropagation();
    AlertService.swal(
      `Are you sure to delete "${movie.title}"?`,
      "Once deleted, you will not be able to recover this movie!",
      "warning",
      true,
      true,
      (decition)=>{
        if(decition) {
          this.movieService.delete(movie._id).subscribe(
            response => {
              const idx = this.movies.findIndex(p => p._id === movie._id)
              this.movies.splice(idx, 1);
              swal("Movie was successfully deleted","", "success");
            },
            error => MaterialService.toast(error.error)
          )
        }
        else {
          swal("Movie wasn't deleted");
        }
      })
  }

  onCancel() {
    this.modal.close()
  }

  onSumbit() {
    this.form.disable()

    const newMovie: Movie = {
      title: this.form.value.title,
      dailyRentalRate: this.form.value.dailyRentalRate,
      numberInStock: this.form.value.numberInStock,
      genreId: this.genreId
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    };

    if (this.movieId) {
      newMovie._id = this.movieId;
      this.movieService.update(newMovie._id, newMovie).subscribe(
        position => {
          const idx = this.movies.findIndex(p => p._id === position._id)
          this.movies[idx] = position;
          MaterialService.toast('Movie was updated')
        },
        error => MaterialService.toast(error.message),
        completed
      )
    } else {
      this.movieService.create(newMovie).subscribe(
        position => {
          MaterialService.toast('Movie was successfully added')
          this.movies.push(position)
        },
        error => MaterialService.toast(error.message),
        completed
      )
    }

  }
}
