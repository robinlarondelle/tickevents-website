import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-overview',
  templateUrl: './purchase-overview.component.html',
  styleUrls: ['./purchase-overview.component.css']
})
export class PurchaseOverviewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  click()  {
    this.router.navigate(["ticket-types"], {relativeTo: this.route.parent})
  }


}
