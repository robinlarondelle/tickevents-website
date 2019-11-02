import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IdentityUser } from 'src/app/shared/models/identityUser.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-d-header',
  templateUrl: './d-header.component.html',
  styleUrls: ['./d-header.component.css']
})
export class DHeaderComponent implements OnInit, OnDestroy {
  logoutConfirmation:boolean = false
  identityUser$: Subscription
  identityUser: IdentityUser

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }


  ngOnInit() {
    this.identityUser$ = this.auth.loggedInIdentityUser.subscribe(idUser => {      
      this.identityUser = idUser
    })
  }


  logout() {
    if(!this.logoutConfirmation) {
      this.logoutConfirmation = true
    } else {
      this.router.navigate(["/home"])
    }
  }

  
  ngOnDestroy() {
    this.identityUser$.unsubscribe()
  }
}
