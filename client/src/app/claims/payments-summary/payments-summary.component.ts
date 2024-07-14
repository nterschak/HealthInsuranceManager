import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/app/_models/payment';

@Component({
  selector: 'app-payments-summary',
  templateUrl: './payments-summary.component.html',
  styleUrls: ['./payments-summary.component.css']
})
export class PaymentsSummaryComponent implements OnInit {
  @Input() payments: Payment[] = [];
  total = 0;

  ngOnInit(): void {
    this.total = this.payments.reduce((t, p) => t + p.amount, 0);
  }
}
