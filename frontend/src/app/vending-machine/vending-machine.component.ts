import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { SodaBrand } from '../models/soda';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }

  @Input()
  userInfo: User = {
    _id: '',
    name: '',
    bankBalance: 0
  };

  sodaList: SodaBrand[] = [];

  ngOnInit(): void {
    this.getSodas();
  }

  getSodas(): void {
    this.apiService.getSodas().subscribe({
      next: (res: any) => this.sodaList = res,
      error: (err: any) => this._snackBar.open(err.error, '', { duration: 5000 })
    });
  }

  purchaseSoda(sodaToPurchase: SodaBrand): void {
    this.apiService.purchaseSoda(this.userInfo, sodaToPurchase).subscribe({
      next: (res: any) => {
        this.userInfo.bankBalance = res.newBankBalance;

        const fileBlob = new Blob([JSON.stringify(res, null, 4)], { type: "text/plain" });
        const fileName = `${res.productName}_${res.purchaseDate}.json`;
        saveAs(fileBlob, fileName)
        this.getSodas();
      },
      error: (err: any) => this._snackBar.open(err.error, '', { duration: 5000 })
    })
  }
}
