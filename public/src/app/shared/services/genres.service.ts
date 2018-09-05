import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Genres} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class GenresService {

  constructor(private http: HttpClient){

  }

  fetch(): Observable<Genres[]> {
    return this.http.get<Genres[]>('/api/genres')
  }

  getById(id: string): Observable<Genres> {
    return this.http.get<Genres>(`/api/genres/${id}`)
  }

  create(genre: Genres): Observable<Genres> {
    return this.http.post<Genres>('/api/genres', genre)
  }

  update(id: string, genre: Genres): Observable<Genres> {
    return this.http.patch<Genres>(`/api/genres/${id}`, genre)
  }

  delete(id: string): Observable<Genres> {
    return this.http.delete<Genres>(`/api/genres/${id}`)
  }
}
