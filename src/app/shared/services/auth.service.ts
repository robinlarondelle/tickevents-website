import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterResponse } from '../models/register-response.model';
import { LoginResponse } from '../models/login-response.model';
import { map, } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { IdentityUser } from '../models/identityUser.model';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loggedInIdentityUser: BehaviorSubject<IdentityUser> = new BehaviorSubject<IdentityUser>(null)


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.isLoggedIn.next(this.updateIsLoggedInStatus())
    this.loggedInIdentityUser.next(this.tokenService.getPayload())
  }


  login(form): Observable<LoginResponse> {
    return this.http.post<any>(`${environment.BASE_URL}/api/auth/login`, form)
      .pipe(
        map(res => {

          //if a login was successfull, the response will contain a token
          if (res && res.token) {
            this.tokenService.setToken(res.token)
            this.isLoggedIn.next(true)
            this.loggedInIdentityUser.next(this.tokenService.getPayload())
          }

          return res
        })
      )
  }


  register(form): Observable<RegisterResponse> {
    return this.http.post(`${environment.BASE_URL}/api/auth/register`, form)
  }


  sendVerification(userid, token): Observable<RegisterResponse> {
    return this.http.post<any>(`${environment.BASE_URL}/api/auth/verify-email/`, {
      "identityUserID": `${userid}`,
      "token": `${token}`
    }).pipe(
      map(res => {

        //if a login was successfull, the response will contain a token
        if (res && res.token) {
          this.tokenService.setToken(res.token)
          this.isLoggedIn.next(true)
          this.loggedInIdentityUser.next(this.tokenService.getPayload())
        }

        return res
      })
    )
  }


  resendVerificationEmail(email) {
    return this.http.post(`${environment.BASE_URL}/api/auth/tokens/resend-verification-email`, { email })
  }


  forgotPassword(email: string) {
    return this.http.post(`${environment.BASE_URL}/api/auth/tokens/forgot-password`, { email })
  }


  postNewPassword(form: FormGroup) {
    return this.http.post(`${environment.BASE_URL}/api/auth/set-new-password`, form.value)
  }


  logout(): void {
    this.tokenService.removeToken()
    this.tokenService.removePayload()
    this.isLoggedIn.next(false)
    this.loggedInIdentityUser.next(null)
  }


  private updateIsLoggedInStatus(): boolean {
    if (!!this.tokenService.getPayload() && !this.tokenService.isTokenExpired()) {
      return true
    } else {
      this.logout()
      return false
    }
  }
}
