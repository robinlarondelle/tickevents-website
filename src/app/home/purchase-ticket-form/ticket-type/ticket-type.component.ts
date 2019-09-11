import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.css']
})
export class TicketTypeComponent implements OnInit {
  @Input() type: TicketType


  constructor(
  ) {

  }

  ngOnInit() { 
  }



}
