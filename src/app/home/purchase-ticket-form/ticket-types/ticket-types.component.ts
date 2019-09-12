import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-types',
  templateUrl: './ticket-types.component.html',
  styleUrls: ['./ticket-types.component.css']
})
export class TicketTypesComponent implements OnInit {
  @Input() type: TicketType


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() { 
  }

  click()  {
    this.router.navigate(["customer-details"], {relativeTo: this.route.parent})
  }


}
