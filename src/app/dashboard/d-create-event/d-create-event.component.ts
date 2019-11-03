import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d-create-event',
  templateUrl: './d-create-event.component.html',
  styleUrls: ['./d-create-event.component.css']
})
export class DCreateEventComponent implements OnInit {
  url:string = 
  `${environment.STRIPE_CONNECT_BASE_URL}` +
  `${environment.STRIPE_AUTHORIZE_URL_ENDPOINT}` +
  `response_type=${environment.STRIPE_RESPONSE_TYPE}&` +
  `client_id=${environment.STRIPE_CLIENT_ID}&` +
  `scope=${environment.STRIPE_SCOPE}`

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToStripe() {
    window.open(this.url, '_blank');
  }

}
