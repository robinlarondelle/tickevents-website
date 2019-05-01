import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';
import { RegisterResponse } from '../models/RegisterResponse';
import { LoginResponse } from '../models/LoginResponse';


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
  }
}
