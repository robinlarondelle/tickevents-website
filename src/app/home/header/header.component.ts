import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from 'src/app/shared/models/User.model';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: []
})
export class HeaderComponent implements OnInit {
  user: User

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.auth.getLoggedInUser()
  }

  logout() {
    console.log('logout');
    
    this.auth.logout()
    this.router.navigate(["/home/welcome"])
  }
}
