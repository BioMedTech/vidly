import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Genres, Movie} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient){

  }

  fetch(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/api/movies')
  }

  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`/api/movies/${id}`)
  }
  getByGenreId(id: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`/api/movies/genre/${id}`)
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>('/api/movies', movie)
  }

  update(id: string, movie: Movie): Observable<Movie> {
    return this.http.patch<Movie>(`/api/movies/${id}`, movie)
  }

  delete(id: string): Observable<Movie> {
    return this.http.delete<Movie>(`/api/movies/${id}`)
  }
}
