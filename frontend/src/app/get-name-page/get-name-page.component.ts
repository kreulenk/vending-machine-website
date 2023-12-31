import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-get-name',
  templateUrl: './get-name-page.component.html',
  styleUrls: ['./get-name-page.component.css']
})
export class GetNamePageComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }

  name = '';

  ngOnInit(): void {
    // Ensure that we are at the login page
    this.router.navigate(['get-name']);
  }

  onNameSubmission(): void {
    this.router.navigate(['vending'], { queryParams: { name: this.name }})
  }
}
