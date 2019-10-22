import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({
    email: this.fb.control('', [Validators.email, Validators.required])
  })
  emailParam: string
  success: boolean = false
  loading: boolean = false
  defaultError: boolean = false
  submitted: boolean = false


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.emailParam = params.email
    })

    this.forgotPasswordForm.patchValue({
      email: this.emailParam
    })
  }


  submit() {
    this.submitted = true
    this.loading = true
    this.defaultError = false
    this.success = false

    this.authService.forgotPassword(this.email.value).subscribe(
      res => {
        this.loading = false
        this.success = true
      },

      error => {
        this.defaultError = true
        this.loading = false
      }
    )
  }


  get email() { return this.forgotPasswordForm.get('email') }
}
