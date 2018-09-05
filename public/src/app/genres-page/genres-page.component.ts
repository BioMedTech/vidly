import {Component, OnInit} from '@angular/core';
import {GenresService} from "../shared/services/genres.service";
import {Observable} from "rxjs/internal/Observable";
import {Genres} from "../shared/interfaces";

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.css']
})
export class GenresPageComponent implements OnInit {

  constructor(private genreService: GenresService) {
  }
  GenreId:string=null

  genres$: Observable<Genres[]>

  ngOnInit() {
    this.genres$ = this.genreService.fetch();
  }

  GetGenre(id:string) {
    this.GenreId=id;
  }
}
