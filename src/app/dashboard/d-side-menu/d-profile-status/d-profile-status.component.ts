import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-profile-status',
  templateUrl: './d-profile-status.component.html',
  styleUrls: ['./d-profile-status.component.css']
})
export class DProfileStatusComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  profileStatus() {
    this.router.navigate(["404"], { relativeTo: this.route })
  }
}
