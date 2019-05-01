import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  model: any = {}; //form-model


  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  onReset(form: NgForm) {
    form.resetForm()
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(res => {
      this.authService.saveToken(res.token)      
      this.router.navigateByUrl("/profile")           
    })
  }

}
