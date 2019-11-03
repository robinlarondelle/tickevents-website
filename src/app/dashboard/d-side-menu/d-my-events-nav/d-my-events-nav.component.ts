import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-my-events-nav',
  templateUrl: './d-my-events-nav.component.html',
  styleUrls: ['./d-my-events-nav.component.css']
})
export class DMyEventsNavComponent implements OnInit {

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
