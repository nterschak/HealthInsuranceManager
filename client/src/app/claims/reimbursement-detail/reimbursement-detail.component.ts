import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reimbursement } from 'src/app/_models/reimbursement';
import { ClaimService } from 'src/app/_services/claim.service';

@Component({
  selector: 'app-reimbursement-detail',
  templateUrl: './reimbursement-detail.component.html',
  styleUrls: ['./reimbursement-detail.component.css']
})
export class ReimbursementDetailComponent {
  @Input() reimbursement?: Reimbursement;

  constructor(private claimService: ClaimService) { }

  markAsReceived() {
    if (this.reimbursement) {
      let updatedReimbursement = {
        id: this.reimbursement?.id,
        amount: this.reimbursement.amount,
        dateSubmitted: this.reimbursement.dateSubmitted,
        dateReceived: new Date().toJSON().slice(0, 10),
        claimId: this.reimbursement.claimId
      };
      this.claimService.updateReimbursement(updatedReimbursement).subscribe();
    }
  }
}
