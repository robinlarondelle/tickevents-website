import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IdentityUser } from '../models/identityUser.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenName: string;
  payloadProperty: string
  jwtHelper: JwtHelperService

  constructor() {
    this.jwtHelper = new JwtHelperService()
    this.tokenName = "Authentication"
    this.payloadProperty = "payload"
  }

  getToken(): string {
    return localStorage.getItem(this.tokenName)
  }

  setToken(token: string) {
    let payload = token.split(".")[1]
    let decoded = atob(payload)

    localStorage.setItem(this.payloadProperty, decoded) //get payload of token
    localStorage.setItem(this.tokenName, token)
  }

  removeToken() {
    localStorage.removeItem(this.tokenName)
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.getToken())
  }

  getTokenExpiryDate(): Date {
    return this.jwtHelper.getTokenExpirationDate(this.getToken())
  }

  getPayload(): IdentityUser {
    return JSON.parse(localStorage.getItem(this.payloadProperty))
  }

  removePayload() {
    localStorage.removeItem(this.payloadProperty)
  }
}
