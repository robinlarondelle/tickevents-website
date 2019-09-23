export class Ticket {
  id: number
  ticketTypeID: number
  boughtBy?: number
  paymentReceived: boolean
  reservated: boolean
  reservatedUntill?: Date
}