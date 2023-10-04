import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vending-page',
  templateUrl: './vending-page.component.html',
  styleUrls: ['./vending-page.component.css']
})
export class VendingPageComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) { }

  name = '';
  userInfo: User = {
    _id: '',
    name: '',
    bankBalance: 0
  };

  ngOnInit(): void {
    // Get username from query params and log them in
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      if (!this.name) this.router.navigate(['get-name'])
      this.login();
    });
  }

  login(): void {
    this.apiService.login(this.name).subscribe({
      next: (res: any) => this.userInfo = res,
      error: () => this._snackBar.open('There was an error getting your user.', '', { duration: 5000 })
    });
  }
}
