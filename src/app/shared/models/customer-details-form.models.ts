import { FormControl, FormGroup } from "@angular/forms";
import { CustomerDetails } from "./customer-details.model";

export class CustomerDetailsForm {
  firstname = new FormControl()
  middlename?= new FormControl()
  lastname = new FormControl()
  email = new FormControl()

  constructor(customerDetails?: CustomerDetails) {
    if (customerDetails) {
      this.firstname.setValue(customerDetails.firstname)
      this.lastname.setValue(customerDetails.lastname)
      this.email.setValue(customerDetails.email)
  
      //optional parameters
      if (customerDetails.middlename) {
        this.middlename.setValue(customerDetails.middlename)
      }
    }
  }
}