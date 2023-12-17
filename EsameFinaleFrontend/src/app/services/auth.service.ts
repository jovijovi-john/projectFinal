import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as sha512 from 'js-sha512';
import { Auth } from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8000/api/v1';

  constructor(private httpClient: HttpClient) {}

  // Start login process
  login(utente: string, password: string): Observable<any> {
    const utenteEncrypted: string = this.encrypt(utente); // encrypt password with hash sha512

    return this.httpClient
      .post(`${this.url}/login`, { utente: utenteEncrypted })
      .pipe(
        take(1),
        map((ret: any) => {
          //Simulates the manipulation of returned data
          const sale = ret.data.sale;

          console.log(`Sale: ${sale}`);

          const utenteHashed = this.encrypt(utente); // encrypt utente
          const passwordHashed = this.encrypt(password); // encrypt password

          // concatenate passwordHashed with sale returned by backend
          const passwordSaleHashed = this.encryptPasswordSale(
            passwordHashed,
            sale
          );

          // Start second part of login
          return this.login2(utenteHashed, passwordSaleHashed);
        })
      );
  }

  // Receive the user hashed and (passwordHashed + sale) hashed
  login2(utenteHashed: string, passwordSaleHashed: string): Observable<any> {
    
    // Return token from user
    return this.httpClient.post(`${this.url}/login`, {
      utente: utenteHashed,
      hashPswSaleUtente: passwordSaleHashed,
    });
  }

  // Return auth object from user (name, idGruppo, ...)
  verifyToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get(`${this.url}/verificaToken`, { headers });
  }

  // Encrypt a string with hash sha512
  encrypt(str: string): string {
    return sha512.sha512(str);
  }
  
  // Save user infos in localStorage (tk, nome, idGruppo)
  saveAuth(auth: Auth) {
    const tmp: string = JSON.stringify(auth);
    localStorage.setItem('auth', tmp);
  }
  
  // Get user infos from localStorage (tk, nome, idGruppo)
  getAuth(): Auth {
    const tmp: string | null = localStorage.getItem('auth');
    let auth: Auth;

    if (tmp !== null) {
      auth = JSON.parse(tmp);
    } else {
      auth = {
        tk: null,
        nome: null,
        idGruppo: null,
      };
    }
    return auth;
  }

  // Remove user infos from localStorage
  removeAuth() {
    localStorage.removeItem('auth');
  }

  // Return (passwordHashed + sale) hashed
  encryptPasswordSale(passwordHashed: string, sale: string): string {
    return this.encrypt(passwordHashed + sale);
  }
}
