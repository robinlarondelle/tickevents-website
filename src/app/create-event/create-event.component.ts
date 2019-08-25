import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log('form posted: ');
    console.log(form);
    
  }

}
