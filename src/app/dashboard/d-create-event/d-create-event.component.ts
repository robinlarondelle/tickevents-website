import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StripeService } from 'src/app/shared/services/stripe.service';

@Component({
  selector: 'app-d-create-event',
  templateUrl: './d-create-event.component.html',
  styleUrls: ['./d-create-event.component.css']
})
export class DCreateEventComponent implements OnInit {

  constructor(
    private stripeService: StripeService
  ) { }

  ngOnInit() {
  }

  navigateToStripe() {
    this.stripeService.startAuthorizationProces(true)
  }
}
