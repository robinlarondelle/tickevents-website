import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PurchaseForm } from '../models/purchase-form.model';
import { TicketType } from '../models/ticket-type.model';
import { CustomerDetailsForm } from '../models/customer-details-form.models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseTicketService {
  
  private purchaseForm: BehaviorSubject <FormGroup | undefined> = new BehaviorSubject(
    this.fb.group(new PurchaseForm(new CustomerDetailsForm())) 
  )

  purchaseForm$: Observable<FormGroup> = this.purchaseForm.asObservable()

  constructor(
    private fb: FormBuilder
  ) {}


  addTicket(type: TicketType) {
    const group = this.purchaseForm.getValue() //returns the FormGroup
    console.log(group);
    
    const tickets = group.get('tickets') as FormArray
    
    tickets.push(new FormControl({
      name: type.name
    }))

    this.purchaseForm.next(group)
  }


  getAmountofSelectedTickets(type: TicketType) {

  }

  removeTicket(type: TicketType) {

  }
}
