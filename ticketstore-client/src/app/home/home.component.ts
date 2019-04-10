import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Formly Setup
  form = new FormGroup({})
  model = {
    email: 'email@email.com'
  }
  fields: FormlyFieldConfig[] = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      label: 'Email Adress',
      placeholder: 'janjansen@email.com',
      required: true
    }
  }]

  constructor() { }

  ngOnInit() {
  }



  submit(model) {console.log(model)}

}
