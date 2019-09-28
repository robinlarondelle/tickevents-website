import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/event.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[]

  constructor(
    private eventService: EventService
  ) {
    this.events = []
  }

  ngOnInit() {

    this.eventService.getEvents().subscribe(events => {
      this.events = events      
    })
  }

}
