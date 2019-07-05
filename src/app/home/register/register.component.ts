import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from "../../shared/validator/MustMatch"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success: Boolean = false
  duplicateEmailError = false
  passwordDontMatchError = false
  model: any = {}; //form-model

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {    
  }

  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe(res => {      
      if (res.message.includes('DuplicateEmailError')) this.duplicateEmailError = true
      else if (res.message.includes('PasswordDontMatchError')) this.passwordDontMatchError = true
      else this.success = true
    })
  }

  onReset(form: NgForm) {
    form.resetForm()
  }

  home() {
    this.router.navigate(["../home"], {relativeTo: this.route})
  }

  resendEmail(email) {
    console.log(`resend email`);
    
  }
}
