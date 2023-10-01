import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }

  username = '';

  ngOnInit(): void {
    // Unsure that we are at the login page
    this.router.navigate(['/login']);
    
    this.apiService.getSodas().subscribe(data => {
    });
  }

  onLoginSubmission(): void {
    const loginUser = this.apiService.loginUser(this.username).subscribe(res => {
      console.log(res);
    })
  }
}
