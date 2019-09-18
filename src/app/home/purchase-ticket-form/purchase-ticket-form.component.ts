import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { Form, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TicketTypesComponent } from './ticket-types/ticket-types.component';
import { Subscription, Subscriber } from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/EventModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-ticket-form',
  templateUrl: './purchase-ticket-form.component.html',
  styleUrls: ['./purchase-ticket-form.component.css']
})
export class PurchaseTicketFormComponent implements OnInit, AfterViewInit {
  event: Event

  // purchaseForm: FormGroup
  // purchaseFormSub: Subscription
  // ticketTypes: FormArray


  constructor(
    private purchaseTicketService: PurchaseTicketService,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
   }

  ngOnInit() {
    // this.purchaseFormSub = this.purchaseTicketService.purchaseForm.subscribe(purchase => {
    //   this.purchaseForm = purchase
    //   this.ticketTypes = this.purchaseForm.get('types') as FormArray
    // })

    
    this.route.params.subscribe(params => {
      let eventId = params.id
      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event
      })
    })


  }

  ngAfterViewInit() {
    // this.ticketForm.addControl('types', this.ticketTypeComponent.typeControl)
  }
}
