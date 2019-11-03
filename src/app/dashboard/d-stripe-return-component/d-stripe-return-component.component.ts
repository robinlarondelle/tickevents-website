import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StripeService } from 'src/app/shared/services/stripe.service';

@Component({
  selector: 'app-d-stripe-return-component',
  templateUrl: './d-stripe-return-component.component.html',
  styleUrls: ['./d-stripe-return-component.component.css']
})
export class DStripeReturnComponentComponent implements OnInit {
  success: boolean
  error: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stripeService: StripeService
  ) { }


  ngOnInit() {
    const params = this.route.snapshot.queryParams

    if (params['error']) {
      this.error = true
    } else if (params['code'] && params['scope']) {
      this.success = true
    } else {
      this.router.navigate(['404'], {relativeTo: this.route})
    }
  }


  navigateToStripe() {
    this.stripeService.startAuthorizationProces(false)
  }
}
