import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-status-summary',
  templateUrl: './claim-status-summary.component.html',
  styleUrls: ['./claim-status-summary.component.css']
})
export class ClaimStatusSummaryComponent {
  @Input() summaryText!: string;

  getPriority(): string {
    if (this.summaryText === 'Processed' || this.summaryText === 'Waiting for reimbursement')
      return 'warning';
    if (this.summaryText === 'Payment due')
      return 'danger';
    if (this.summaryText === 'Completed')
      return 'success';
    return 'neutral'
  }

  getIconName(): string {
    if (this.summaryText === 'Processed' || this.summaryText === 'Payment due')
      return 'fa-exclamation-circle';
    if (this.summaryText === 'Waiting for reimbursement')
      return 'fa-clock-o';
    if (this.summaryText === 'Completed' || this.summaryText === 'No action')
      return 'fa-check';
    return ''    
  }
}
