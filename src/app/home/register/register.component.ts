import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from "../../shared/validator/MustMatch"
import { MustMatchDirective } from 'src/app/shared/directives/MustMatchDirective';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConf: ['', [Validators.required]],
  })


  success: Boolean = false
  duplicateEmailError = false
  passwordDontMatchError = false
  model: any = {}; //form-model

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {    
  }

  submit() {
    this.authService.register(this.registerForm.value).subscribe(res => {      
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
