import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { Form, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TicketTypesComponent } from './ticket-types/ticket-types.component';
import { Subscription, Subscriber } from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/event.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-ticket-form',
  templateUrl: './purchase-ticket-form.component.html',
  styleUrls: ['./purchase-ticket-form.component.css']
})
export class PurchaseTicketFormComponent implements OnInit, AfterViewInit, OnDestroy {
  event: Event
  purchaseForm: FormGroup
  purchaseForm$: Subscription


  constructor(
    private purchaseTicketService: PurchaseTicketService,
    private route: ActivatedRoute,
    private eventService: EventService
  ) { 
    this.purchaseForm = new FormGroup({})
  }


  ngOnInit() {

    //Get current event ID
    this.route.params.subscribe(params => {
      let eventId = params.id
      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event

        //Pre-fill the form with the corresponding ticket types
        this.purchaseTicketService.loadTicketTypes(this.event.eventID)

        //Get Form Properties
        this.purchaseForm$ = this.purchaseTicketService.purchaseForm$.subscribe(form => {                    
          this.purchaseForm = form          
        })  
      })
    })
  }


  ngAfterViewInit() {
    // this.ticketForm.addControl('types', this.ticketTypeComponent.typeControl)
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.purchaseForm$.unsubscribe()
  }
}
