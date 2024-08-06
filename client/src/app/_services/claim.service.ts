import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../_models/claim';
import { environment } from 'src/environments/environment';
import { Reimbursement } from '../_models/reimbursement';
import { Payment } from '../_models/payment';
import { BehaviorSubject, map } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaymentAddComponent } from '../modals/payment-add/payment-add.component';
import { ClaimParams } from '../_models/claimParams';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl = environment.apiUrl
  private claimUpdatedSource = new BehaviorSubject<Claim | null>(null);
  claimUpdated$ = this.claimUpdatedSource.asObservable();
  bsModalRef?: BsModalRef<PaymentAddComponent>;

  constructor(private http: HttpClient, private modalService: BsModalService) { }

  getClaims(claimParams: ClaimParams) {
    let params = new HttpParams();
    params = params.append("year", claimParams.year);
    params = params.append("unpaidOnly", claimParams.unpaidOnly);
    params = params.append("patientId", claimParams.patientId);

    return this.http.get<Claim[]>(this.baseUrl + 'claims', { params });
  }

  getClaim(id: number) {
    return this.http.get<Claim>(this.baseUrl + 'claims/' + id);
  }

  getClaimByClaimNumber(claimNumber: string) {
    return this.http.get<Claim>(this.baseUrl + 'claims/claim-number/' + claimNumber);
  }

  checkClaimExists(claimNumber: string) {
    return this.http.get<boolean>(this.baseUrl + 'claims/exists/' + claimNumber);
  }

  addClaim(claim: Claim) {
    return this.http.post(this.baseUrl + 'claims', claim);
  }

  addReimbursement(reimbursement: Reimbursement) {
    return this.http.post(this.baseUrl + 'claims/reimbursement', reimbursement).pipe(
      map((claim: any) => this.claimUpdatedSource.next(claim))
    );
  }

  updateReimbursement(reimbursement: Reimbursement) {
    return this.http.put(this.baseUrl + 'claims/reimbursement', reimbursement).pipe(
      map(() => {
        this.getClaim(reimbursement.claimId).subscribe({
          next: claim => this.claimUpdatedSource.next(claim)
        })
      })
    );
  }

  addPayment(payment: Payment) {
    return this.http.post(this.baseUrl + 'claims/payment', {
      id: 0,
      amount: payment.amount,
      datePaid: payment.datePaid.toJSON().slice(0, 10),
      claimId: payment.claimId,
      paymentMethodId: payment.paymentMethodId
    });
  }

  addPaymentWithModalForm(claimId: number) {
    this.bsModalRef = this.modalService.show(PaymentAddComponent)
    this.bsModalRef.onHidden!.subscribe({
      next: () => {
        const result = this.bsModalRef!.content!.result;
        const payment = this.bsModalRef!.content!.paymentForm.value;

        if (result && payment) {
          payment.claimId = claimId;
          this.addPayment(payment).subscribe({
            next: (claim: any) => this.claimUpdatedSource.next(claim)
          })
        }
      }
    });
  }
}