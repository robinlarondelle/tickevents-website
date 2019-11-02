import { Component, OnInit } from '@angular/core';
import { IdentityUser } from 'src/app/shared/models/identityUser.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-d-profile',
  templateUrl: './d-profile.component.html',
  styleUrls: ['./d-profile.component.css']
})
export class DProfileComponent implements OnInit {
  identityUser: IdentityUser

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loggedInIdentityUser.subscribe(idUser => {
      this.identityUser = idUser
    })
  }

}
