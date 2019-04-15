import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success: Boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe(res => {
      console.log(res);
      this.success = true;
      
    })
    
  }

  onReset(form: NgForm) {
    form.reset()
  }

  home() {
    this.router.navigate(["../home"], {relativeTo: this.route})
  }
}
