import { Component, OnInit } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';

@Component({
  selector: 'app-purchase-ticket',
  templateUrl: './purchase-ticket.component.html',
  styleUrls: ['./purchase-ticket.component.css']
})
export class PurchaseTicketComponent implements OnInit {
  ticketTypes: TicketType[]
  constructor() {
    this.ticketTypes = []
   }

  ngOnInit() {
    const ticket1: TicketType = {
      id: 1,
      eventId: 1,
      price: 30.00,
      type: 'VIP',
      available: 25
    }

    const ticket2: TicketType = {
      id: 2,
      eventId: 1,
      price: 10.00,
      type: 'Regular',
      available: 12
    }

    const ticket3: TicketType = {
      id: 3,
      eventId: 1,
      price: 9.50,
      type: 'Early Bird',
      available: 10
    }

    const ticket4: TicketType = {
      id: 4,
      eventId: 1,
      price: 25.00,
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

}
