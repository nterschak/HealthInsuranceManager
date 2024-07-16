import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/app/_models/payment';

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  styleUrls: ['./payments-summary.component.css']
})
export class PaymentsSummaryComponent implements OnInit {
  @Input() payments: Payment[] = [];
  @Input() amountOwed = 0;

  ngOnInit(): void {}

  calculateTotal() {
    return this.payments.reduce((t, p) => t + p.amount, 0);
  }

  isFullyPaid(): boolean {
    return this.calculateTotal() >= (this.amountOwed - 0.005);
  }
}