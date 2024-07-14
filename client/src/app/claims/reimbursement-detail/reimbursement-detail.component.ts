import { Component, Input } from '@angular/core';
import { Reimbursement } from 'src/app/_models/reimbursement';

@Component({
  selector: 'app-reimbursement-detail',
  templateUrl: './reimbursement-detail.component.html',
  styleUrls: ['./reimbursement-detail.component.css']
})
export class ReimbursementDetailComponent {
  @Input() reimbursement?: Reimbursement;
}
