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
export class PurchaseTicketFormComponent implements OnInit, OnDestroy {
  purchaseForm: FormGroup
  purchaseForm$: Subscription
  event: Event


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private purchaseTicketService: PurchaseTicketService
  ) {
    this.purchaseForm = new FormGroup({})
  }


  ngOnInit() {
    
    //Get current event ID
    this.route.params.subscribe(params => {

      this.eventService.getEventById(params.id).subscribe(event => {
        this.event = event
      })

      //Pre-fill the form with the corresponding ticket types
      this.purchaseTicketService.initForm(params.id)

      //Get Form Properties
      this.purchaseForm$ = this.purchaseTicketService.purchaseForm$.subscribe(purchaseForm => {
        this.purchaseForm = purchaseForm
      })
    })
  }


  ngOnDestroy(): void {
    this.purchaseForm$.unsubscribe()
  }
}
