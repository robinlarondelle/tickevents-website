import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RegisterResponse } from '../models/RegisterResponse';
import { LoginResponse } from '../models/LoginResponse';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { User } from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(form): Observable<LoginResponse> {
    return this.http.post<any>(`${environment.BASE_URL}/api/login`, form)
      .pipe(
        map(res => {

          //if a login was successfull, the response will contain a token
          if (res && res.token) {
            this.tokenService.setToken(res.token)
          }

          return res
        })
      )
  }


  register(form): Observable<RegisterResponse> {
    return this.http.post(`${environment.BASE_URL}/api/register`, form)
  }


  sendVerification(userid, token): Observable<RegisterResponse> {
    return this.http.post(`${environment.BASE_URL}/api/verify-email/`, {
      "IdentityUserID": `${userid}`,
      "Token": `${token}`
    })
  }


  logout(): void {
    this.tokenService.removeToken()
  }


  isLoggedIn(): boolean {
    return !!this.tokenService.getToken()
  }


  getLoggedInUser(): User {    
    return this.tokenService.getPayload()
  }
}
