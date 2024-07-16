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
      this.claimService.addReimbursement({
        id: 0,
        amount: this.claim.amountOwed * 0.75,
        dateSubmitted: new Date().toJSON().slice(0, 10),
        claimId: this.claim.id
      }).subscribe({
        next: () => console.log('Reimbursement added')
      });
    }
  }

  addPayment() {
    if (this.claim) {
      this.claimService.addPaymentWithModalForm(this.claim.id);
    }
  }
}