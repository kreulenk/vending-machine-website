import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetNamePageComponent } from './get-name-page/get-name-page.component';
import { VendingPageComponent } from './vending-page/vending-page.component';

const routes: Routes = [
  { path: '', component: GetNamePageComponent },
  { path: 'get-name', component: GetNamePageComponent },
  { path: 'vending', component: VendingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
