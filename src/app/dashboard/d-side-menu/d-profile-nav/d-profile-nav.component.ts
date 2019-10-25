import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-profile-nav',
  templateUrl: './d-profile-nav.component.html',
  styleUrls: ['./d-profile-nav.component.css']
})
export class DProfileNavComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  profile() {
      this.router.navigate(["profile"], {relativeTo: this.route})
  }
}
