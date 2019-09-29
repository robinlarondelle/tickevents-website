import { TicketType } from "./ticket-type.model";

export class TicketTypeAmount {
  ticketType: TicketType
  amount: number

  constructor(ticketType: TicketType, amount: number) {
    this.ticketType = ticketType
    this.amount = amount
  }
}