import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PurchaseForm } from '../models/purchase-form.model';
import { TicketType } from '../models/ticket-type.model';
import { CustomerDetailsForm } from '../models/customer-details-form.models';
import { EventService } from './event.service';
import { TicketTypeForm } from '../models/ticket-type-form.model'
import { TicketTypeAmount } from '../models/ticket-type-amount.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseTicketService {


  private purchaseForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
    this.fb.group(new PurchaseForm(new CustomerDetailsForm()))
  )

  purchaseForm$: Observable<FormGroup> = this.purchaseForm.asObservable()
  purchaseTotal: BehaviorSubject<number> = new BehaviorSubject(0)
  purchases: BehaviorSubject<TicketTypeAmount[]> = new BehaviorSubject([])

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {

  }


  //Initiate the purchaseForm with the correct types
  loadTicketTypes(eventID: number) {
    this.eventService.getEventTypesByEventId(eventID).subscribe(types => {

      let purchaseFormGroup = this.purchaseForm.getValue() // get the purchase FormGroup
      let ticketTypesFormGroup = (<FormArray>purchaseFormGroup.get('tickets')) //returns the tickets FormArray which holds all the tickets

      //Clear array of previous loadTicketTypes requests
      while (ticketTypesFormGroup.length) {
        ticketTypesFormGroup.removeAt(0)
      }

      types.map(type => { // Loop through all the types of the corresponding Event
        ticketTypesFormGroup.push(
          this.fb.group(new TicketTypeForm(type, 0))  // Load the new TicketTypes
        )
      })

      this.purchaseForm.next(purchaseFormGroup) // notify all observers 
    })
  }

  // Detect when changes have happened on the TicketTypeAmount FormControl. The change can occur when
  // the user increments or decrements with the two buttons, or when he manually inserts a value
  change(ticketTypeAmount: TicketTypeAmount) {       

  }
}
