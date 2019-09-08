import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/EventModel';
import { Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event',
  inputs: ['event'],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event

  constructor(
    private router: Router,
    private eventService: EventService
  ) {  }

  ngOnInit() {
  }

  onClick() { 
    this.eventService.setSelectedEvent(this.event)
    this.router.navigateByUrl("/home/events/" + this.event.EventID)
  }

}
