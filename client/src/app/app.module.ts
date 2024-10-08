import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MemberListComponent } from './members/member-list/member-list.component';
import { NavComponent } from './nav/nav.component';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { HomeComponent } from './home/home.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { ClaimCardComponent } from './claims/claim-card/claim-card.component';
import { ClaimDetailComponent } from './claims/claim-detail/claim-detail.component';
import { ReimbursementDetailComponent } from './claims/reimbursement-detail/reimbursement-detail.component';
import { PaymentsSummaryComponent } from './claims/payments-summary/payments-summary.component';
import { PaymentAddComponent } from './modals/payment-add/payment-add.component';
import { ClaimStatusSummaryComponent } from './claims/claim-status-summary/claim-status-summary.component';
import { ClaimImportComponent } from './claims/claim-import/claim-import.component';
import { ClaimTableComponent } from './claims/claim-table/claim-table.component';
import { ClaimImportTableComponent } from './claims/claim-import-table/claim-import-table.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { PaymentMethodCardComponent } from './payments/payment-method-card/payment-method-card.component';
import { PaymentMethodListComponent } from './payments/payment-method-list/payment-method-list.component';
import { PaymentMethodEditComponent } from './payments/payment-method-edit/payment-method-edit.component';
import { ReimbursementAddComponent } from './modals/reimbursement-add/reimbursement-add.component';
import { PaymentAddDropdownComponent } from './claims/payment-add-dropdown/payment-add-dropdown.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaymentRuleListComponent } from './payments/payment-rule-list/payment-rule-list.component';
import { PaymentsHomeComponent } from './payments/payments-home/payments-home.component';
import { PaymentRuleEditComponent } from './payments/payment-rule-edit/payment-rule-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    NavComponent,
    ClaimListComponent,
    HomeComponent,
    MemberEditComponent,
    ConfirmDialogComponent,
    ClaimCardComponent,
    ClaimDetailComponent,
    ReimbursementDetailComponent,
    PaymentsSummaryComponent,
    PaymentAddComponent,
    ClaimStatusSummaryComponent,
    ClaimImportComponent,
    ClaimTableComponent,
    ClaimImportTableComponent,
    LoadingComponent,
    PaymentMethodCardComponent,
    PaymentMethodListComponent,
    PaymentMethodEditComponent,
    ReimbursementAddComponent,
    PaymentAddDropdownComponent,
    PaymentRuleListComponent,
    PaymentsHomeComponent,
    PaymentRuleEditComponent
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
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }