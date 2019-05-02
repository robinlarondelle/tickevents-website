import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Config } from 'protractor';
import { RegisterResponse } from '../_models/RegisterResponse';
import { LoginResponse } from '../_models/LoginResponse';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string

  constructor(
    private http: HttpClient
  ) {}

  public saveToken(token: string): void {
    localStorage.setItem('mean-token', token)
    this.token = token     
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
}
