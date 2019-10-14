import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomerDetails } from "./customer-details.model";

export class CustomerDetailsForm {
  firstname = new FormControl('', [Validators.required])
  lastname = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email])

  constructor(customerDetails?: CustomerDetails) {
    if (customerDetails) {
      this.firstname.setValue(customerDetails.firstname)
      this.lastname.setValue(customerDetails.lastname)
      this.email.setValue(customerDetails.email)
    }
  }
}