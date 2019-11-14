import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { TicketTypeAmount } from 'src/app/shared/models/ticket-type-amount.model';
import { CustomerDetails } from 'src/app/shared/models/customer-details.model';
import { environment } from 'src/environments/environment';
import { StripeService } from 'src/app/shared/services/stripe.service';
declare var Stripe: any

@Component({
  selector: 'app-purchase-overview',
  templateUrl: './purchase-overview.component.html',
  styleUrls: ['./purchase-overview.component.css']
})
export class PurchaseOverviewComponent implements OnInit, AfterViewInit {
  purchaseForm: FormGroup
  ticketTypeAmounts: TicketTypeAmount[]
  customer: CustomerDetails
  total: number
  idealBank: any


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private purchaseTicketService: PurchaseTicketService,
    private stripeService: StripeService
  ) { }


  ngOnInit() {
    this.purchaseTicketService.purchaseForm$
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(form => {

        this.purchaseForm = form
        this.ticketTypeAmounts = form.value.tickets
        this.customer = form.value.customer

        this.total = this.purchaseTicketService.purchaseTotal.getValue()
      })

    this.idealBank = this.stripeService.getStripeElements()
  }

  ngAfterViewInit() {
    // Add an instance of the idealBank Element into
    // the `ideal-bank-element` <div>.
    this.idealBank.mount('#ideal-bank');
    this.idealBank.on('change', ({ value }) => {
      this.idealBankProp.setValue(value)
    });
  }


  click() {
    this.purchaseTicketService.sendPurchase(this.idealBank).subscribe(res => {
      console.log(res);
    })
  }


  return() {
    this.router.navigate(["./customer-details"], { relativeTo: this.route.parent })
  }

  get idealBankProp() { return this.purchaseForm.get('idealBank') }

}
