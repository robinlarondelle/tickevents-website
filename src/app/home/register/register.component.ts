import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success: Boolean = false
  duplicateEmailError: boolean = false
  passwordDontMatchError = false
  model: any = {}; //form-model
  loading: boolean = false
  defaultWarning: boolean = false
  submitted: boolean = false
  registerForm = this.fb.group({
    firstname:    ['', [Validators.required]],
    lastname:     ['', [Validators.required]],
    email:        ['', [Validators.required, Validators.email]],
    password:     ['', [Validators.required, Validators.minLength(6)]],
    passwordConf: ['', [Validators.required]],
  })


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
  }


  submit() {
    this.submitted = true
    this.loading = true
    this.success = false
    this.duplicateEmailError = false
    this.defaultWarning = false
    this.passwordDontMatchError = false

    if (this.password.value != this.passwordConf.value) {
      this.loading = false
      this.passwordDontMatchError = true
    } else {
      this.authService.register(this.registerForm.value).subscribe(

        res => {
         this.success = true
          this.loading = false
        },

        error => {
          switch (error.type) {
            case "DuplicateEmailError":
              this.duplicateEmailError = true
              break
            case "PasswordsDontMatchError":
              this.passwordDontMatchError = true
              break
            default:
              this.defaultWarning = true;
          }

          this.loading = false
        }
      )
    }
  }


  onReset(form: NgForm) {
    form.resetForm()
  }


  home() {
    this.router.navigate(["../home"], { relativeTo: this.route })
  }


  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get passwordConf() { return this.registerForm.get('passwordConf') }
}
