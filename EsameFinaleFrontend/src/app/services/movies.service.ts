import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl: string = 'http://localhost:8000/api/v1';
  constructor(private httpClient: HttpClient) {}

  // Get single movie by id
  fetchFilm(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.baseUrl}/film/${id}`, { headers });
  }

  // Get all movies from a category
  fetchFilmsCategory(token: string, idCategory: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.baseUrl}/categorie/film/${idCategory}`, {
      headers,
    });
  }

  // Create a movie, receive movie infos from arg movie passed by parameter
  createMovie(token: string, movie: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(`${this.baseUrl}/film`, movie, { headers });
  }

  // Update a movie, receive movie infos from arg movie passed by parameter
  updateMovie(token: string, movie: any, idMovie: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.put(`${this.baseUrl}/film/${idMovie}`, movie, {
      headers,
    });
  }

  // Delete a movie by id
  deleteMovie(token: string, idMovie: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(`${this.baseUrl}/film/${idMovie}`, {
      headers,
    });
  }
}
