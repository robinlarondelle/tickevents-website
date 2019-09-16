import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Event } from '../models/EventModel';
import * as moment from 'moment'
import { map } from 'rxjs/operators';
import { TicketType } from '../models/ticket-type.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  selectedEvent: Event
  events: Event[]
  lastEventsFetch: moment.Moment
  firstEventFetch: boolean
  updateEvents: boolean //property to 'manually' request the service to update the events

  constructor(
    private http: HttpClient
   ) { 
     this.firstEventFetch = true
     this.updateEvents = false
     this.events = []
   }

   //Decide to fetch events from server based on some service-properties
   //Fetch from server when: firstfetch, updateEvents, lastfecht more than 1 hour ago, 0 events in array
   getEvents(): Observable<Event[]> {
    if (!this.firstEventFetch || this.updateEvents) {
      if (this.lastEventsFetch != undefined && !this.lastEventsFetch.isBefore(moment().subtract(1, 'hour'))) {
        if (this.events != undefined && this.events.length > 0) {
          return of (this.events)
        }
      }
    }

    this.firstEventFetch = false
    this.lastEventsFetch = moment()
    this.updateEvents = false
    return this.http.get<any>(`${environment.BASE_URL}/api/events`)
      .pipe(
        map(res => {
          if (res.events) {
            this.events = res.events
            return this.events
          }
        })
      )
   }


   getEventById(id: Number): Observable<Event> {
     return this.http.get<Event>(`${environment.BASE_URL}/api/events/${id}`)
   }

   
   getEventTypesByEventId(id: Number): Observable<TicketType[]> {
     return this.http.get<TicketType[]>(`${environment.BASE_URL}/api/events/${id}/types`)
   }


   getSelectedEvent(): Event {
     return this.selectedEvent
   }


   setSelectedEvent(event: Event) {
     this.selectedEvent = event
   }


   purchaseTicket(eventID: number) {
     return -1 //TODO implement endpoint
   }


   //request the service to update it's events, even if there hasn't passed 1 hour since lastFetch
   setUpdateEvents() {
     this.updateEvents = true
   }
}
