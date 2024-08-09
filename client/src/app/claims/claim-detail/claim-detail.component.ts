import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Claim } from '../../_models/claim';
import { Reimbursement } from 'src/app/_models/reimbursement';
import { ClaimService } from 'src/app/_services/claim.service';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {
  @Input() claim?: Claim;

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void { }

  addReimbursement() {
    if (this.claim) {
      this.claimService.addReimbursementWithModalForm(this.claim.id);
    }
  }

  addPayment() {
    if (this.claim) {
      this.claimService.addPaymentWithModalForm(this.claim.id);
    }
  }

  remainingBalance(): number {
    if (this.claim?.payments) {
      return this.claim.amountOwed - this.claim.payments.reduce((t, p) => t + p.amount, 0);
    } else {
      return 0;
    }
  }
}