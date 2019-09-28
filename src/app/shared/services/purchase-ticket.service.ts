import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PurchaseForm } from '../models/purchase-form.model';
import { TicketType } from '../models/ticket-type.model';
import { CustomerDetailsForm } from '../models/customer-details-form.models';
import { EventService } from './event.service';
import { TicketTypeForm } from '../models/ticket-type-form.model'

@Injectable({
  providedIn: 'root'
})
export class PurchaseTicketService {
  private purchaseForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
    this.fb.group(new PurchaseForm(new CustomerDetailsForm()))
  )

  purchaseForm$: Observable<FormGroup> = this.purchaseForm.asObservable()
  purchaseTotal: BehaviorSubject<number> = new BehaviorSubject(0)

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
      while(ticketTypesFormGroup.length) {
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


  // Increment the amount of times a ticket type is selected
  incrementType(type: TicketType) {
    const group = this.purchaseForm.getValue()
    const ticketTypesFormGroups = group.get('tickets') as FormArray // Get the available formgroups with ticketTypes

    ticketTypesFormGroups.controls.map(ticketTypeForm => {

      if (ticketTypeForm.value.type === type) { // find the one ticketType that matches the parameter TicketType
        ticketTypeForm.get('amount').setValue(ticketTypeForm.value.amount + 1) // increment amount-field
        
        const toAdd = ticketTypeForm.value.type.pricePerTicket
        this.purchaseTotal.next(this.purchaseTotal.getValue() + toAdd) // update total purchase amount
      }
    })

    this.purchaseForm.next(group) // update observers
  }


  // Decrement the amount of times a ticket type is selected
  decrementType(type: TicketType) {
    const group = this.purchaseForm.getValue()
    const ticketTypesFormGroups = group.get('tickets') as FormArray // Get the available formgroups with ticketTypes

    ticketTypesFormGroups.controls.map(ticketTypeForm => {

      if (ticketTypeForm.value.type === type) { // find the one TicketType that matches the parameter TicketType
        if (ticketTypeForm.value.amount > 0) { // only decrement when the current amount is 1 or more

          //
          // TODO: Prevent manually updating value to a negative number with FormControl
          //

          ticketTypeForm.get('amount').setValue(ticketTypeForm.value.amount - 1)

          const toSub = ticketTypeForm.value.type.pricePerTicket
          this.purchaseTotal.next(this.purchaseTotal.getValue() - toSub) // update total purchase amount

        } else {
          //TODO: Throw UI error
        }
      }
    })
  }
}
