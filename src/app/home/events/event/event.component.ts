import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/EventModel';

@Component({
  selector: 'app-event',
  inputs: ['event'],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event
  image: string

  constructor() {  }

  ngOnInit() {
    this.image = this.event.Image
    
  }

  purchaseTicket() {
    console.log("purchase Ticket");
  }

  getImage() {
    return this.image
  }

}
