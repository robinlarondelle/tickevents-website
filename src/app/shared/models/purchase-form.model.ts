import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { CustomerDetailsForm } from "./customer-details-form.models";
import { CustomerDetails } from "./customer-details.model";

export class PurchaseForm {
  tickets = new FormArray([])
  customer = new FormGroup({})
  eventID = new FormControl()

  constructor(customerDetailsForm: CustomerDetailsForm){
    this.customer.addControl('firstname', customerDetailsForm.firstname)
    this.customer.addControl('middlename', customerDetailsForm.middlename)
    this.customer.addControl('lastname', customerDetailsForm.lastname)
    this.customer.addControl('email', customerDetailsForm.email)
  }
}

