import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class PurchaseForm {
  tickets = new FormArray([])
  customer = new FormGroup({})
  eventID = new FormControl()

  constructor(eventID?: number, tickets?: any) {
    if (eventID) {
      this.eventID.setValue(eventID)
    }

    if (tickets) {
      this.tickets.setValue([tickets])
    }
  }
}

