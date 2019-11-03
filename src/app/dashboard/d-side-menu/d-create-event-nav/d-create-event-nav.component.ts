import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-d-create-event-nav',
  templateUrl: './d-create-event-nav.component.html',
  styleUrls: ['./d-create-event-nav.component.css']
})
export class DCreateEventNavComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  createEvent() {
    this.router.navigate(["create-event"], {relativeTo: this.route})
}

}
