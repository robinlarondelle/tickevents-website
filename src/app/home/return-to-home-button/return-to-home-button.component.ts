import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-to-home-button',
  templateUrl: './return-to-home-button.component.html',
  styleUrls: ['./return-to-home-button.component.css']
})
export class ReturnToHomeButtonComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(["home"])
  }

}
