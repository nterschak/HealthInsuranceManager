import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NavComponent } from './nav/nav.component';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { HomeComponent } from './home/home.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { MemberAddComponent } from './members/member-add/member-add.component';
import { ClaimCardComponent } from './claims/claim-card/claim-card.component';
import { ClaimDetailComponent } from './claims/claim-detail/claim-detail.component';
import { ReimbursementDetailComponent } from './claims/reimbursement-detail/reimbursement-detail.component';
import { PaymentsSummaryComponent } from './claims/payments-summary/payments-summary.component';
import { PaymentAddComponent } from './modals/payment-add/payment-add.component';
import { ClaimStatusSummaryComponent } from './claims/claim-status-summary/claim-status-summary.component';
import { ClaimImportComponent } from './claims/claim-import/claim-import.component';
import { ClaimTableComponent } from './claims/claim-table/claim-table.component';
import { ClaimImportTableComponent } from './claims/claim-import-table/claim-import-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    NavComponent,
    ClaimListComponent,
    HomeComponent,
    MemberEditComponent,
    ConfirmDialogComponent,
    MemberAddComponent,
    ClaimCardComponent,
    ClaimDetailComponent,
    ReimbursementDetailComponent,
    PaymentsSummaryComponent,
    PaymentAddComponent,
    ClaimStatusSummaryComponent,
    ClaimImportComponent,
    ClaimTableComponent,
    ClaimImportTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }