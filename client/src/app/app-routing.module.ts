import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ClaimImportComponent } from './claims/claim-import/claim-import.component';
import { PaymentMethodListComponent } from './payments/payment-method-list/payment-method-list.component';
import { PaymentMethodEditComponent } from './payments/payment-method-edit/payment-method-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'claims', component: ClaimListComponent},
  { path: 'claims/import', component: ClaimImportComponent},
  { path: 'members', component: MemberListComponent},
  { path: 'members/add', component: MemberEditComponent},
  { path: 'members/edit/:id', component: MemberEditComponent},
  { path: 'payment-methods', component: PaymentMethodListComponent},
  { path: 'payment-methods/add', component: PaymentMethodEditComponent},
  { path: 'payment-methods/edit/:id', component: PaymentMethodEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
