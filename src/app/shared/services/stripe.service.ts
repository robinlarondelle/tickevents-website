import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
declare var Stripe:any

@Injectable({
  providedIn: 'root'
})
export class StripeService {
    stripe = Stripe(environment.STRIPE_API_KEY);
    private url: string

  constructor(
    private http: HttpClient
  ) {
    this.url =
      `${environment.STRIPE_CONNECT_BASE_URL}` +
      `${environment.STRIPE_AUTHORIZE_URL_ENDPOINT}` +
      `response_type=${environment.STRIPE_RESPONSE_TYPE}&` +
      `client_id=${environment.STRIPE_CLIENT_ID}&` +
      `scope=${environment.STRIPE_SCOPE}`
  }

  startAuthorizationProces(newTab: boolean = true) {
    if (newTab) {
      window.open(this.url, '_blank');
    } else {
      window.location.href = this.url
    }
  }

  fetchUserCredentials(code: String) {
    return this.http.post(`${environment.BASE_URL}/api/users/stripe/credentials`, {code})
  }

  getStripeElements() {
    var elements = this.stripe.elements()
    const options = {
      // Custom styling can be passed to options when creating an Element.
      style: {
        base: {
          // Add your base input styles here. For example:
          fontSize: '16px',
          color: '#32325d',
          padding: '10px 12px',
        },
      }
    }
    
    // Create an instance of the idealBank Element.
    return elements.create('idealBank', options);
  }
}
