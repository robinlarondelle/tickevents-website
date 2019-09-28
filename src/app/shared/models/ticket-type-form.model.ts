import { FormControl, Validators } from "@angular/forms"
import { TicketType } from "./ticket-type.model"

export class TicketTypeForm {
  type = new FormControl('')
  amount = new FormControl(0, [
    Validators.min(0)
  ])

  constructor(type?: TicketType, amount?: number) {
    if (type) {
      this.type.setValue(type)
    }

    if (amount) {
      this.amount.setValue(amount)
    }
  }
}