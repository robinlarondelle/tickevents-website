import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TicketType } from 'src/app/shared/models/ticket-type.model';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css', '../ticket-types.component.css']
})
export class TypeComponent implements OnInit {
  @Input() typeForm: FormGroup
  @Output() increase: EventEmitter<any> = new EventEmitter()
  @Output() decrease: EventEmitter<any> = new EventEmitter()
  type: TicketType


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() { }


  click() {
    this.router.navigate(["customer-details"], { relativeTo: this.route.parent })
  }


  decreaseType() {
    this.decrease.emit(this.typeForm.controls.type.value)
  }


  increaseType() {    
    this.increase.emit(this.typeForm.controls.type.value)
  }
}
