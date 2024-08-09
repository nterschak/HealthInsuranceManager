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
import { ReimbursementAddComponent } from '../modals/reimbursement-add/reimbursement-add.component';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl = environment.apiUrl
  private claimUpdatedSource = new BehaviorSubject<Claim | null>(null);
  claimUpdated$ = this.claimUpdatedSource.asObservable();
  reimbursementBsModalRef?: BsModalRef<ReimbursementAddComponent>;
  paymentBsModalRef?: BsModalRef<PaymentAddComponent>;

  constructor(private http: HttpClient, private modalService: BsModalService,
    private dateService: DateService) { }

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
    return this.http.post(this.baseUrl + 'claims/reimbursement', {
      id: 0,
      amount: reimbursement.amount,
      dateSubmitted: this.dateService.getLocalDateString(reimbursement.dateSubmitted),
      dateReceived: null,
      claimId: reimbursement.claimId
    }).pipe(
      map((claim: any) => this.claimUpdatedSource.next(claim))
    );
  }

  updateReimbursement(reimbursement: Reimbursement) {
    return this.http.put(this.baseUrl + 'claims/reimbursement', {
      id: reimbursement.id,
      amount: reimbursement.amount,
      dateSubmitted: reimbursement.dateSubmitted,
      dateReceived: this.dateService.getLocalDateString(new Date()),
      claimId: reimbursement.claimId
    }).pipe(
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
      datePaid: this.dateService.getLocalDateString(payment.datePaid),
      claimId: payment.claimId,
      paymentMethodId: payment.paymentMethodId
    });
  }

  addReimbursementWithModalForm(claimId: number) {
    this.reimbursementBsModalRef = this.modalService.show(ReimbursementAddComponent)
    this.reimbursementBsModalRef.onHidden!.subscribe({
      next: () => {
        const result = this.reimbursementBsModalRef!.content!.result;
        const reimbursement = this.reimbursementBsModalRef!.content!.reimbursementForm.value;

        if (result && reimbursement) {
          reimbursement.claimId = claimId;
          this.addReimbursement(reimbursement).subscribe({
            next: (claim: any) => this.claimUpdatedSource.next(claim)
          });
        }
      }
    });
  }  

  addPaymentWithModalForm(claimId: number) {
    this.paymentBsModalRef = this.modalService.show(PaymentAddComponent)
    this.paymentBsModalRef.onHidden!.subscribe({
      next: () => {
        const result = this.paymentBsModalRef!.content!.result;
        const payment = this.paymentBsModalRef!.content!.paymentForm.value;

        if (result && payment) {
          payment.claimId = claimId;
          this.addPayment(payment).subscribe({
            next: (claim: any) => this.claimUpdatedSource.next(claim)
          });
        }
      }
    });
  }
}