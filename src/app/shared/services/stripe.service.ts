import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  url:string = 
  `${environment.STRIPE_CONNECT_BASE_URL}` +
  `${environment.STRIPE_AUTHORIZE_URL_ENDPOINT}` +
  `response_type=${environment.STRIPE_RESPONSE_TYPE}&` +
  `client_id=${environment.STRIPE_CLIENT_ID}&` +
  `scope=${environment.STRIPE_SCOPE}`

  constructor() { }

  startAuthorizationProces(newTab: boolean = true) {
    if (newTab) {
      window.open(this.url, '_blank');
    } else {
      window.location.href = this.url
    }
  }
}
