import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string;
  tokenName: string;
  jwtHelper: JwtHelperService

  constructor() { 
    this.jwtHelper = new JwtHelperService()
    this.tokenName = "Authentication"
  }

  getToken(): string {     
    return localStorage.getItem(this.tokenName)
  }

  setToken(token: string) {
    let payload = token.split(".")[1]    
    let decoded = atob(payload)
    
    localStorage.setItem('payload', decoded) //get payload of token
    localStorage.setItem(this.tokenName, token)
  }

  removeToken() {
    localStorage.removeItem(this.tokenName)
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.token)
  }
  
  getTokenExpiryDate(): Date {
    return this.jwtHelper.getTokenExpirationDate(this.token)
  }

  getPayload(): User { 
    return JSON.parse(localStorage.getItem('payload'))
   }
}
