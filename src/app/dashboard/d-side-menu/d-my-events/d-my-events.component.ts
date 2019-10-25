import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-my-events',
  templateUrl: './d-my-events.component.html',
  styleUrls: ['./d-my-events.component.css']
})
export class DMyEventsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  myEvents() {
    this.router.navigate(["404"], { relativeTo: this.route })
  }
}
