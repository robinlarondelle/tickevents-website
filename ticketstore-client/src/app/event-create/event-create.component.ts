import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    //Formly Setup
    form = new FormGroup({})

    //Create the JSON model which is send to the API
    model = {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
    }

    //Create user input fields which will be displayed on screen
    fields: FormlyFieldConfig[] = [{
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email Adress',
        placeholder: 'janjansen@email.com',
        required: true
      }
    }, {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        placeholder: 'John',
        required: true
      }
    }, {
      key: 'middlename',
      type: 'input',
      templateOptions: {
        label: 'Middle Name',
        placeholder: 'Alfred',
        required: false
      }
    }, {
      key: 'lastname',
      type: 'input',
      templateOptions: {
        label: 'Last Name',
        placeholder: 'Doe',
        required: true
      }
    }]

    //Make API call here
    submit(model) {
      console.log(model)
    }

}
