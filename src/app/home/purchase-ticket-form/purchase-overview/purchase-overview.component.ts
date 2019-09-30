import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { TicketTypeAmount } from 'src/app/shared/models/ticket-type-amount.model';
import { CustomerDetails } from 'src/app/shared/models/customer-details.model';

@Component({
  selector: 'app-purchase-overview',
  templateUrl: './purchase-overview.component.html',
  styleUrls: ['./purchase-overview.component.css']
})
export class PurchaseOverviewComponent implements OnInit {
  purchaseForm: FormGroup
  ticketTypeAmounts: TicketTypeAmount[]
  customer: CustomerDetails
  total: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private purchaseTicketService: PurchaseTicketService
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
        console.log(this.customer);
        
        this.total = this.purchaseTicketService.purchaseTotal.getValue()
      })

  }

  click() {
    this.router.navigate(["ticket-types"], { relativeTo: this.route.parent })
  }


}
