import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PurchaseForm } from '../models/purchase-form.model';
import { TicketType } from '../models/ticket-type.model';
import { CustomerDetailsForm } from '../models/customer-details-form.models';
import { EventService } from './event.service';
import { TicketTypeForm } from '../models/ticket-type-form.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseTicketService {
  private purchaseForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
    this.fb.group(new PurchaseForm(new CustomerDetailsForm()))
  )

  purchaseForm$: Observable<FormGroup> = this.purchaseForm.asObservable()

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {

  }

  loadTicketTypes(eventID: number) {
    this.eventService.getEventTypesByEventId(eventID).subscribe(types => {
      types.map(type => {

        const group = this.purchaseForm.getValue() //returns the FormGroup    
        const tickets = group.get('tickets') as FormArray

        tickets.push(
          this.fb.group(
            new TicketTypeForm(type, 0)
          )
        )

        this.purchaseForm.next(group)
      })
    })
  }

  increaseType(type: TicketType) {
    const group = this.purchaseForm.getValue()
    const typesGroups = group.get('tickets') as FormArray

    typesGroups.controls.map(ticketTypeForm => {

      if (ticketTypeForm.value.type === type) {
        ticketTypeForm.get('amount').setValue(ticketTypeForm.value.amount + 1)
      }
    })

    this.purchaseForm.next(group)
  }


  decreaseType(type: TicketType) {
    const group = this.purchaseForm.getValue()
    const typesGroups = group.get('tickets') as FormArray

    typesGroups.controls.map(ticketTypeForm => {

      if (ticketTypeForm.value.type === type) {
        if (ticketTypeForm.value.amount  > 0 ) {
          ticketTypeForm.get('amount').setValue(ticketTypeForm.value.amount - 1)
        } else {
          //TODO: Throw error
        }
      }
    })

  }
}
