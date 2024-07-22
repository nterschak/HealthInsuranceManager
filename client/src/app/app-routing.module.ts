import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberAddComponent } from './members/member-add/member-add.component';
import { ClaimImportComponent } from './claims/claim-import/claim-import.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'claims', component: ClaimListComponent},
  { path: 'claims/import', component: ClaimImportComponent},
  { path: 'members', component: MemberListComponent},
  { path: 'members/add', component: MemberAddComponent},
  { path: 'members/edit/:id', component: MemberEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
