import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerieTvService {
  baseUrl: string = 'http://localhost:8000/api/v1';
  constructor(private httpClient: HttpClient) {}

  // Get single serie
  fetchSerieTv(token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.baseUrl}/serieTv/${id}`, { headers });
  }

  // Get all series from category
  fetchSeriesCategory(token: string, idCategory: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(
      `${this.baseUrl}/categorie/serieTv/${idCategory}`,
      {
        headers,
      }
    );
  }

  // Create a serie, receive serie infos from arg serie passed by parameter
  createSerie(token: string, serie: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(`${this.baseUrl}/serieTv`, serie, { headers });
  }

  // Update a serie, receive serie infos from arg serie passed by parameter
  updateSerie(token: string, serie: any, idSerie: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.put(`${this.baseUrl}/serieTv/${idSerie}`, serie, {
      headers,
    });
  }

  // Delete a serie by id
  deleteSerie(token: string, idSerie: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(`${this.baseUrl}/serieTv/${idSerie}`, {
      headers,
    });
  }
}
