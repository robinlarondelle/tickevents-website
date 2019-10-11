import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Event } from "../../../../shared/models/event.model"
import { trigger, state, style, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.css'],
  animations: [
    trigger('hoverOverCard', [
      state('front', style({

      })),

      state('back', style({

      })),

      transition('front => back', [

      ]),

      transition('back => front', [

      ])
    ])
  ]
})
export class EventTileComponent implements OnInit {
  @Input() event: Event

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {

  }


  eventDetails() {
    this.router.navigate([`events/${this.event.eventID}`], {relativeTo: this.route.parent})
  }
  

  orderTicket() {
    this.router.navigate([`events/${this.event.eventID}/purchase`], {relativeTo: this.route.parent})
  }
}
