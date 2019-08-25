import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient,  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RegisterResponse } from '../models/RegisterResponse';
import { LoginResponse } from '../models/LoginResponse';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string

  constructor(
    private http: HttpClient
  ) {}

  saveToken(token: string): void {
    localStorage.setItem('x-access-token', token)
    this.token = token     
  }

  getToken():string {
    return localStorage.getItem('x-access-token')
  }


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
    return this.http.post(`${environment.BASE_URL}/api/login`, form)
      .pipe(
        tap(_ => console.log(`Login`)),
        catchError(this.handleError('Login', {}))
      )
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any):Observable<T> => {
      console.error(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  loggedIn() {
    return !!this.getToken()
  }
}
