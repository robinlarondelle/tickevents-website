import { Component, OnInit, Input, AfterViewInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';
import { Subscription} from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { TicketTypeAmount } from 'src/app/shared/models/ticket-type-amount.model';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css']
})
export class TicketTypesComponent implements OnInit, OnDestroy  {
  ticketTypeForm: FormArray
  purchaseForm$: Subscription
  total: number = 0
  total$: Subscription


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private purchaseTicketService: PurchaseTicketService
  ) {
    this.ticketTypeForm = new FormArray([])
  }


  ngOnInit() {
    //load purchase total
    this.total = this.purchaseTicketService.purchaseTotal.getValue()

    //Get the current available ticket types
    this.purchaseForm$ = this.purchaseTicketService.purchaseForm$.subscribe(form => {
      this.ticketTypeForm = form.get('tickets') as FormArray
    })

 
    //Get notified when the total purchase amount changes, and update the value to the service
    this.total$ = this.purchaseTicketService.purchaseTotal.subscribe(purchaseTotal => {      
      this.total = purchaseTotal
    })

    //Calculate the total current price
    this.ticketTypeForm.valueChanges.subscribe(changes => {
      let subTotal = 0;

      changes.map(ticketTypeAmount => {
        subTotal += ticketTypeAmount.amount * ticketTypeAmount.ticketType.pricePerTicket
      })

      this.total = subTotal
    });
    
  }


  return() {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }


  next() {
    this.router.navigate(["customer-details"], { relativeTo: this.route.parent })
  }


  manualChange(typeAmount: TicketTypeAmount) {
    if( typeAmount.amount !== null) {
      this.purchaseTicketService.change(new TicketTypeAmount(typeAmount.ticketType, typeAmount.amount))
    }
  }


  ngOnDestroy() {
    this.purchaseForm$.unsubscribe()
    this.total$.unsubscribe()
    this.purchaseTicketService.purchaseTotal.next(this.total)
  }
}
