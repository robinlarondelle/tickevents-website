import { FormControl, Validators } from "@angular/forms"
import { TicketType } from "./ticket-type.model"

export class TicketTypeForm {
  ticketType = new FormControl('')
  amount = new FormControl(0, [
    Validators.min(0)
  ])

  constructor(ticketType?: TicketType, amount?: number) {
    if (ticketType) {
      this.ticketType.setValue(ticketType)
    }

    if (amount) {
      this.amount.setValue(amount)
    }
  }
}