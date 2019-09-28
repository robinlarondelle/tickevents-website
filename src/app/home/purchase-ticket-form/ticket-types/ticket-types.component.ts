import { Component, OnInit, Input, AfterViewInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';
import { Subscription} from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css']
})
export class TicketTypesComponent implements OnInit, OnDestroy  {
  types: TicketType[] = []
  ticketTypeForm: FormArray
  purchaseForm$: Subscription
  total: number = 0
  total$: Subscription


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private purchaseTicketService: PurchaseTicketService
  ) {}


  ngOnInit() {

    //Get the current Event Type from the header
    this.route.params.subscribe(params => {
      this.eventService.getEventTypesByEventId(params.id).subscribe((types: TicketType[]) => {
        this.types = types
      })
    })


    //Get the current available ticket types
    this.purchaseForm$ = this.purchaseTicketService.purchaseForm$.subscribe(form => {
      this.ticketTypeForm = form.get('tickets') as FormArray
    })


    //Get notified when the total purchase amount changes, and update the value to the service
    this.total$ = this.purchaseTicketService.purchaseTotal.subscribe(purchaseTotal => {
      this.total = purchaseTotal
    })
  }


  return() {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }


  next() {
    this.router.navigate(["customer-details"], { relativeTo: this.route.parent })
  }


  increaseType(type: TicketType) {
    this.purchaseTicketService.incrementType(type)
  }


  decreaseType(type: TicketType) {
    this.purchaseTicketService.decrementType(type)
  }


  ngOnDestroy() {
    this.purchaseForm$.unsubscribe()
    this.total$.unsubscribe()
  }
}
