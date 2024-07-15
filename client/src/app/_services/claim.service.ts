import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../_models/claim';
import { environment } from 'src/environments/environment';
import { Reimbursement } from '../_models/reimbursement';
import { Payment } from '../_models/payment';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl = environment.apiUrl
  private claimUpdatedSource = new BehaviorSubject<Claim | null>(null);
  claimUpdated$ = this.claimUpdatedSource.asObservable();

  constructor(private http: HttpClient) { }

  getClaims() {
    return this.http.get<Claim[]>(this.baseUrl + 'claims');
  }

  getClaim(id: number) {
    return this.http.get<Claim>(this.baseUrl + 'claims/' + id);
  }

  getUnpaidClaims() {
    return this.http.get<Claim>(this.baseUrl + 'claims/unpaid');
  }

  getClaimByClaimNumber(claimNumber: string) {
    return this.http.get<Claim>(this.baseUrl + 'claims/claim-number/' + claimNumber);
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
    return this.http.post(this.baseUrl + 'claims/payment', payment);
  }
}
