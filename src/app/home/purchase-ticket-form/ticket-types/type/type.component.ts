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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }

  click()  {
    this.router.navigate(["customer-details"], {relativeTo: this.route.parent})
  }

}
