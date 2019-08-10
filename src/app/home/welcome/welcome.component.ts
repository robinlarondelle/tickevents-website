import { Component, OnInit, HostListener, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('showHideMouse', [

      state('show', style({
        opacity: 1,

      })),

      state('hide', style({
        opacity: 0
      })),

      transition('show  <=> hide', [
        animate('0.3s ease-in-out')
      ]),

      transition('* => show', [
        animate('1s')

      ])
    ])
  ]
}
)


export class WelcomeComponent implements OnInit, AfterContentInit {

  mouseState
  allowedToScroll = false

  ngOnInit() {
    this.mouseState = 'hide'
  }


  ngAfterContentInit(): void {
    this.allowedToScroll = true    
    this.mouseState = 'show'
  }

  constructor() { }


  onScroll() {
    if (this.allowedToScroll) {
      this.mouseState = 'hide'
    }
  }



}