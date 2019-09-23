import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { CustomerDetailsForm } from 'src/app/shared/models/customer-details-form.models';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customerForm: FormGroup
  pf$: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private purchaseTicketService: PurchaseTicketService
  ) { }

  ngOnInit() {
    this.pf$ = this.purchaseTicketService.purchaseForm$.subscribe(form => {
      this.customerForm = form.get('customer') as FormGroup
    })
  }

  click()  {
    console.log(this.customerForm.value)
    this.router.navigate(["purchase-overview"], {relativeTo: this.route.parent})
  }

  return() {
    this.router.navigate(["ticket-types"], {relativeTo: this.route.parent})
  }

  ngOnDestroy() {
    this.pf$.unsubscribe()
  }


}
