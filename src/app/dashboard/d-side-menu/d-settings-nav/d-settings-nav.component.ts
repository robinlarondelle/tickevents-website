import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-settings-nav',
  templateUrl: './d-settings-nav.component.html',
  styleUrls: ['./d-settings-nav.component.css']
})
export class DSettingsNavComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  settings() {
    this.router.navigate(["404"], { relativeTo: this.route })
  }
}
