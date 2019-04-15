import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from '../services/email-verification.service';

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
    private emailVerificationService: EmailVerificationService
  ) { }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.identityUserID = +params['userid']
      this.token = params['token']
      this.jwt = params['jwt']

      console.log(this.identityUserID);
      console.log(this.token);
      console.log(this.jwt);
      
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  onClick() {    
    this.emailVerificationService.sendVerification(this.identityUserID, this.token).subscribe(res => {
      console.log(res);
      
    })
  }
}