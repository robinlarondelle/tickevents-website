export class Ticket {
  id: number
  eventId: number
  type: string
  paymentReceived: boolean
  boughtBy?: number
  price: number
}