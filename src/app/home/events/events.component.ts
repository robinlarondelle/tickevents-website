import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/EventModel';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[]
  lastFetch: Date

  constructor(
    private eventService: EventService
  ) {
    this.events = []
    this.lastFetch = this.getLastFetch()
  }

  ngOnInit() {


    // if (this.lastFetch >= )

    this.eventService.getEvents().subscribe(events => {
      events.map(event => this.events.push(event))
    })
  }

  getLastFetch(): Date {
    return new Date(localStorage.getItem('lastFetch'))
  }

  setLastFetch() {
    localStorage.setItem('lastFetch', new Date().toString())
  }

}
