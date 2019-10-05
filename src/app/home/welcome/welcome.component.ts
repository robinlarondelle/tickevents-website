import { Component, OnInit, HostListener, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

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

      transition('* => show', [
        animate('1s ease-in')
      ]),

      transition('show  => hide', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
}
)


export class WelcomeComponent implements OnInit, AfterContentInit {

  mouseState = 'hide'
  allowedToScroll = false

  ngOnInit() {}

  ngAfterContentInit(){
    setTimeout(() => {
      this.allowedToScroll = true
      this.mouseState = 'show'
    }, 1000)
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onScroll() {
    // if (this.allowedToScroll) {
    //   this.mouseState = 'hide'
    // }
    console.log("scrolling...");
    
  }

  createEvent() {
    this.router.navigate(["/dashboard"], {relativeTo: this.route.parent})
  }
}