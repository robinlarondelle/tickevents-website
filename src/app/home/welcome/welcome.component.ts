import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],

  animations: [

    trigger('openClose', [

      state('open', style({
        height: '200px',
        color: 'blue',
      })),
  
      state('closed', style({
        height: '220px',
        color: 'red'  
      })),
  
      transition('open <=> closed', [
        animate('0.5s')
      ])
    ])

  ]
})
export class WelcomeComponent implements OnInit {

  isOpen: boolean = true

  constructor() { }

  ngOnInit() {
  }

  toggleOpenClose() {
    this.isOpen = !this.isOpen
  }



}
