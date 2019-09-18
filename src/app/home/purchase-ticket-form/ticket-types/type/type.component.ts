import { Component, OnInit, Input } from '@angular/core';
import { TicketType } from 'src/app/shared/models/ticket-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  @Input() type: TicketType
  amount = 0
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  click()  {
    this.router.navigate(["customer-details"], {relativeTo: this.route.parent})
  }

  minus() {
    if (this.amount >= 1) {
      this.amount--
    }
  }

  plus() {
    this.amount++
  }

}
