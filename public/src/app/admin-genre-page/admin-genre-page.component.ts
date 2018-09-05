import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Genres, Movie} from "../shared/interfaces";
import {GenresService} from "../shared/services/genres.service";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {Subscription} from "rxjs/internal/Subscription";
import {MovieService} from "../shared/services/movie.service";
import {AlertService} from "../shared/classes/alert.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-genre-page',
  templateUrl: './admin-genre-page.component.html',
  styleUrls: ['./admin-genre-page.component.css']
})
export class AdminGenrePageComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private genreService: GenresService) { }
  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('collapse') collapseRef: ElementRef;

  collapsible: MaterialInstance;
  modal: MaterialInstance;
  form: FormGroup;
  genres:Genres[];
  aSub:Subscription;
  movies: Movie[];
  genreId=null;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    this.aSub=this.genreService.fetch().subscribe((genres)=>{
      this.genres=genres;
      },
    (err)=>{MaterialService.toast(err.error)});

  }

  ngAfterViewInit(){
    this.collapsible=MaterialService.initCollapsible(this.collapseRef);
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy()
  }


  onDeleteGenre($event: Event, genre: Genres) {
      $event.stopPropagation();
      AlertService.swal(
        `Are you sure to delete ${genre.name}?`,
        "Once deleted, you will not be able to recover this genre and movies of this genre!",
        "warning",
        true,
        true,
        (decition)=>{
          if(decition) {
            this.genreService.delete(genre._id).subscribe(
              response => {
                const idx = this.genres.findIndex(p => p._id === genre._id)
                this.genres.splice(idx, 1);
                swal("Genre was successfully deleted", "", "success");
              },
              error => MaterialService.toast(error.error)
            )
          }
          else {
            swal("Genre wasn't deleted");
          }
        })
    }

  onAddGenre(){
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onEditGenre($event:Event, genre: Genres){
    $event.stopPropagation();
    this.genreId = genre._id;
    this.form.patchValue({
      name:genre.name
    });
    this.modal.open();
    MaterialService.updateTextInputs()
  }


  onSumbit(){
    this.form.disable();

    const newGenre: Genres = {
      name: this.form.value.name
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({name: ''})
      this.form.enable()
    };

    if (this.genreId) {
      newGenre._id = this.genreId;
      this.genreService.update(newGenre._id, newGenre).subscribe(
        position => {
          const idx = this.genres.findIndex(p => p._id === position._id)
          this.genres[idx] = position;
          MaterialService.toast('Genre was updated')
        },
        error => MaterialService.toast(error.message),
        completed
      )
    } else {
      this.genreService.create(newGenre).subscribe(
        position => {
          MaterialService.toast('Genre was successfully added')
          this.genres.push(position)
        },
        error => MaterialService.toast(error.message),
        completed
      )
    }
  }
}
