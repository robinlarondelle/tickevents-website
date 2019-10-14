import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TicketType } from 'src/app/shared/models/ticket-type.model';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css', '../ticket-types.component.css']
})
export class TypeComponent implements OnInit, AfterViewInit {
  @Input() typeForm: FormGroup
  @ViewChild('amountControl') amountControl: ElementRef


  constructor( ) { }


  ngOnInit() { }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.amountControl.nativeElement.onkeydown = function (e) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        return false;
      }
    }
  }


  decreaseType() {
    this.typeForm.controls.amount.setValue(this.typeForm.controls.amount.value - 1)
  }


  increaseType() {
    this.typeForm.controls.amount.setValue(this.typeForm.controls.amount.value + 1)
  }
}
