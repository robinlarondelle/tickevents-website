import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

  identityUserID: number
  token: String
  jwt: String
  private sub: any


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.identityUserID = +params['userid']
      this.token = params['token']
      this.jwt = params['jwt']
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onClick() {    
    this.authService.sendVerification(this.identityUserID, this.token).subscribe(res => {

      //if no status 201
        //let user ask for new token
      
      //save jwt token
      //log user in
      //redirect to profile page


      console.log(res);
      
    })
  }
}