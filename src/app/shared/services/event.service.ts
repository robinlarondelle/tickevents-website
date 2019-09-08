import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Event as EventModel } from '../models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  selectedEvent: EventModel
  events: EventModel[]
  lastFetch: Date

  constructor(
    private http: HttpClient
   ) { }

   getEvents(): Observable<EventModel[]> {
     return this.http.get<EventModel[]>(`${environment.BASE_URL}/api/events`)
   }

   getEventById(id: Number): Observable<EventModel> {
     return this.http.get<EventModel>(`${environment.BASE_URL}/api/events/${id}`)
   }

   getSelectedEvent(): EventModel {
     return this.selectedEvent
   }

   setSelectedEvent(event: EventModel) {
     this.selectedEvent = event
   }

   purchaseTicket(eventID: number) {
     return -1 //TODO implement endpoint
   }
}
