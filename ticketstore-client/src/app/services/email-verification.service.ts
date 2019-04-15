import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(
    private http: HttpClient
  ) {}

  sendVerification(userid, token) {    
    return this.http.post(`${environment.BASE_URL}/api/verify-email/`, {
      "IdentityUserID": `${userid}`,
      "Token": `${token}`
    })
  }
}
