import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { IdentityUser } from 'src/app/shared/models/identityUser.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  identityUser: IdentityUser
  identityUser$: Subscription
  logoutConfirmation = false
  loggedIn: boolean = false
  loggedIn$: Subscription
  loading: boolean = false


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.loading = true

    this.loggedIn$ = this.auth.isLoggedIn.subscribe(status => {
      this.loggedIn = status

      this.identityUser$ = this.auth.loggedInIdentityUser.subscribe(idUser => {      
        this.identityUser = idUser
        this.loading = false
      })
    })
  }


  logout() {   
    if (this.logoutConfirmation) {
      this.auth.logout()
      this.router.navigate(["/home/welcome"])
      this.logoutConfirmation = false

    } else {
      this.logoutConfirmation = true
      event.stopPropagation()
    }
  }


  ngOnDestroy() {
    this.loggedIn$.unsubscribe()
    this.identityUser$.unsubscribe()
  }
}
