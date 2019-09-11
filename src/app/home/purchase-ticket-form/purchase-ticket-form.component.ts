import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { Form, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';
import { Subscription } from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';

@Component({
  selector: 'app-purchase-ticket-form',
  templateUrl: './purchase-ticket-form.component.html',
  styleUrls: ['./purchase-ticket-form.component.css']
})
export class PurchaseTicketFormComponent implements OnInit, AfterViewInit {


  ticketTypes: TicketType[]

  constructor(
    private purchaseTicketService: PurchaseTicketService
  ) {
    this.ticketTypes = []
   }

  ngOnInit() {


    const ticket1: TicketType = {
      id: 1,
      eventId: 1,
      price: 3000,
      type: 'VIP',
      available: 25
    }

    const ticket2: TicketType = {
      id: 2,
      eventId: 1,
      price: 1000,
      type: 'Regular',
      available: 12
    }

    const ticket3: TicketType = {
      id: 3,
      eventId: 1,
      price: 950,
      type: 'Early Bird',
      available: 10
    }

    const ticket4: TicketType = {
      id: 4,
      eventId: 1,
      price: 2500,
      type: 'Deluxe',
      available: 30
    }


    this.ticketTypes.push(
      ticket1,
      ticket2,
      ticket3,
      ticket4,
    )
  }

  ngAfterViewInit() {
    // this.ticketForm.addControl('types', this.ticketTypeComponent.typeControl)
  }

}
