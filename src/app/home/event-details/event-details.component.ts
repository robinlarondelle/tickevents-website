import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { Event } from "../../shared/models/EventModel"

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

    //Get selected event from the application
    this.event = this.eventService.getSelectedEvent()

    //If the user navigated to this endpoint by typing in the URL, the selectedEvent property is not set
    //In that case, we need to fetch the selectedEvent from the server
    if (!!!this.event) {
      let eventID = null;
      this.activeRoute.params.subscribe(params => {
        eventID = params.id
        
        this.eventService.getEventById(eventID).subscribe(event => {
          this.event = event
        })
      })
    }
  }

  return() {
    this.router.navigateByUrl("/home/events")
  }

  purchase() {        
    this.router.navigate(["purchase/ticket-types"], {relativeTo: this.activeRoute})
  }

}
