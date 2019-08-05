import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/models/EventModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  inputs: ['event'],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: Event

  constructor(
    private router: Router
  ) {  }

  ngOnInit() {
  }

  onClick() {    
    this.router.navigateByUrl("/home/events/" + this.event.EventID)
  }

}
