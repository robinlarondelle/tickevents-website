import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-d-settings',
  templateUrl: './d-settings.component.html',
  styleUrls: ['./d-settings.component.css']
})
export class DSettingsComponent implements OnInit {

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
