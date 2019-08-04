import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/models/EventModel';


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

    for (var i = 1; i <= 10; i++) {
      var newEvent: Event = {
        EventID: 1,
        UserID: 1,
        EventName: "Test Event " + i,
        EventVenue: "The Exampler",
        VenueAddress: "Example Avenue 34",
        VenueZipcode: "1234 AA",
        VenueCity: "Example City",
        VenueCountry: "ExampleTopia",
        EventDate: new Date("2019-09-01"),
        Capacity: "3000",
        PricePerTicket: 7.99,
        Image: "src\\assets\\demo-poster.png"
      }

      this.events.push(newEvent)

    }

  }

}
