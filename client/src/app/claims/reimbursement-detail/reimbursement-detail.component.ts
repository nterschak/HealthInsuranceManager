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
      this.claimService.updateReimbursement(this.reimbursement).subscribe();
    }
  }
}
