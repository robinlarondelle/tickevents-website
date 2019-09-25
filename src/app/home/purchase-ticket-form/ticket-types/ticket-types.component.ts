import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';
import { TicketTypeForm } from 'src/app/shared/models/ticket-type-form.model';
import { Subscription } from 'rxjs';
import { PurchaseTicketService } from 'src/app/shared/services/purchase-ticket.service';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css']
})
export class TicketTypesComponent implements OnInit, OnDestroy {
  types: TicketType[]
  ticketTypeForm: FormArray
  pf$: Subscription


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private purchaseTicketService: PurchaseTicketService
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


    this.pf$ = this.purchaseTicketService.purchaseForm$.subscribe(form => {
      this.ticketTypeForm = form.get('tickets') as FormArray      
    })
  }


  return() {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }


  next() {
    this.router.navigate(["customer-details"], { relativeTo: this.route.parent })
  }
  

  increaseType() {
    console.log("increase");
  }


  decreaseType() {
    console.log("decrease");
  }


  ngOnDestroy() {
    this.pf$.unsubscribe()
  }
}
