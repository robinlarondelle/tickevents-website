import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PurchaseForm } from '../models/purchase-form.model';
import { TicketType } from '../models/ticket-type.model';
import { CustomerDetailsForm } from '../models/customer-details-form.models';
import { EventService } from './event.service';
import { TicketTypeForm } from '../models/ticket-type-form.model'
import { TicketTypeAmount } from '../models/ticket-type-amount.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StripeService } from './stripe.service';
declare var Stripe: any

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
    private eventService: EventService,
    private stripeService: StripeService,
    private http: HttpClient
  ) { }


  //Initiate the purchaseForm with the correct types
  initForm(eventID: number) {
    this.purchaseForm.getValue().get('eventID').setValue(eventID)
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


  sendPurchase(idealBank: any) {
    let form = this.purchaseForm.value.value

    var stripe = this.stripeService.stripe
    // Create a Stripe client.
    // Note: this merchant has been set up for demo purposes.
    const sourceData = {
      type: 'ideal',
      amount: 1099,
      currency: 'eur',
      owner: {
        name: "Jan van leeuwen"
      },
      // Specify the URL to which the customer should be redirected
      // after paying.
      redirect: {
        return_url: 'http://svturing.nl',
      },
    };
  
    // Call `stripe.createSource` with the idealBank Element and
    // additional options.
    stripe.createSource(idealBank, sourceData).then(source => {
      console.log(source);
    }).catch(err =>{
      console.log(err);
    })

    return this.http.post<any>(`${environment.BASE_URL}/api/events/${form.eventID}/initialize-purchase`, form)
  }

  getStripeElements() {

  }
}

