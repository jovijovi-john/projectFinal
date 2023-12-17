import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //get all nations
  fetchNazioni(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/api/v1/nazioni');
  }

  //get all comuniItaliani
  fetchComuniItaliani(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/api/v1/comuniItaliani');
  }

  //get all provincie
  fetchProvincia(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/api/v1/provincia');
  }

  //registrate a user
  registrateUser(user: any): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8000/api/v1/registrazione',
      user
    );
  }
}
