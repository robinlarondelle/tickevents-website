import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RegisterResponse } from '../models/RegisterResponse';
import { LoginResponse } from '../models/LoginResponse';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  //token getters and setters
  setToken(token: string): void {
    localStorage.setItem('x-access-token', token)
  }


  getToken(): string {
    return localStorage.getItem('x-access-token')
  }


  removeToken() {
    localStorage.removeItem('x-access-token')
  }


  //Auth request endpoints
  sendVerification(userid, token): Observable<RegisterResponse> {
    return this.http.post(`${environment.BASE_URL}/api/verify-email/`, {
      "IdentityUserID": `${userid}`,
      "Token": `${token}`
    })
  }


  register(form): Observable<RegisterResponse> {
    return this.http.post(`${environment.BASE_URL}/api/register`, form)
  }


  login(form): Observable<LoginResponse> {
    return this.http.post<any>(`${environment.BASE_URL}/api/login`, form)
      .pipe(
        map(res => {

          //if a login was successfull, the response will contain a token
          if (res && res.token) {
            this.setToken(res.token)

          }

          return res
        })
      )
  }

  logout() {
    this.removeToken()
  }

  loggedIn() {
    return !!this.getToken()
  }
}
