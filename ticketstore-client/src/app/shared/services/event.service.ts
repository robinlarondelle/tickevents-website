import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Event } from '../models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
   ) { }

   getEvents(): Observable<Event[]> {
     return this.http.get<Event[]>(`${environment.BASE_URL}/api/events`)
   }

   purchaseTicket(eventID: number) {
     return -1 //TODO implement endpoint
   }
}
