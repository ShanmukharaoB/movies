import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'https://movies-api14.p.rapidapi.com/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '6e4988df9emshb9f65cd0587a0c2p159550jsn832099995a44',
      'X-RapidAPI-Host':'movies-api14.p.rapidapi.com'
      // Add any other headers required by the API
    });

    // Make a GET request to the movies endpoint
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }
}
