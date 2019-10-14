import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';
import { Subscription } from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { Event } from 'src/app/shared/models/event.model';
import { TicketTypeAmount } from 'src/app/shared/models/ticket-type-amount.model';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css']
})
export class TicketTypesComponent implements OnInit, OnDestroy {
  ticketTypeForm: FormArray
  purchaseForm$: Subscription
  total: number = 0
  total$: Subscription
  event: Event


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private purchaseTicketService: PurchaseTicketService,
    private eventService: EventService
  ) {
    this.ticketTypeForm = new FormArray([])
  }


  ngOnInit() {
    //load purchase total
    this.total = this.purchaseTicketService.purchaseTotal.getValue()

    //Get the current available ticket types
    this.purchaseForm$ = this.purchaseTicketService.purchaseForm$.subscribe(form => {
      this.ticketTypeForm = form.get('tickets') as FormArray

      //Get current event
      this.eventService.getEventById(form.value.eventID).subscribe(event => {
        this.event = event
      })
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


  reset() {
    this.ticketTypeForm.controls.map(control => {
      control.patchValue({ amount: 0 })
    })
  }


  next() {
    let allowContinue = false;
    this.ticketTypeForm.value.map(ticketTypeAmount => {
      if (ticketTypeAmount.amount > 0) {
        allowContinue = true
      }
    })    

    if (allowContinue) {
      this.router.navigate(["customer-details"], { relativeTo: this.route.parent })
    } else {
      console.log("not allowed");
      //alert
    }
  }


  ngOnDestroy() {
    this.purchaseForm$.unsubscribe()
    this.total$.unsubscribe()
    this.purchaseTicketService.purchaseTotal.next(this.total)
  }
}
