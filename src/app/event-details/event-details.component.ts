import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/services/event.service';
import { Event } from "../shared/models/EventModel"

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit() {
    let eventID = null;
    this.activeRoute.params.subscribe(params => {
      eventID = params.id
    })

    this.eventService.getEventById(eventID).subscribe(event => {
      this.event = event
    })
  }

  return() {
    this.router.navigateByUrl("/home/events")
  }

}
