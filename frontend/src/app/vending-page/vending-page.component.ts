import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user';

@Component({
  selector: 'app-vending-page',
  templateUrl: './vending-page.component.html',
  styleUrls: ['./vending-page.component.css']
})
export class VendingPageComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  username: string = '';
  sodaList: any = [];
  userInfo: User = {
    _id: '',
    name: '',
    bankBalance: 0
  };

  ngOnInit(): void {
    // Get username from query params and log them in
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
      if (!this.username) this.router.navigate(['get-name'])
      this.getUser();
    });
  }

  getUser(): void {
    this.apiService.getUser(this.username).subscribe({
      next: (res: any) => this.userInfo = res,
      error: () => console.log('error logging in')
    });
  }
}
