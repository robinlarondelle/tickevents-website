import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css']
})
export class TicketTypesComponent implements OnInit {
  types: TicketType[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.types = []
  }

  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.eventService.getEventTypesByEventId(params.id).subscribe((types: TicketType[]) => {
        types.map((type: TicketType) => {          
          this.types.push(type)
        })
      })
    })

  }

  return() {
    this.router.navigate(['../..'], {relativeTo: this.route})
  }

  next() {
    this.router.navigate(["customer-details"], {relativeTo: this.route.parent})
  }
}
