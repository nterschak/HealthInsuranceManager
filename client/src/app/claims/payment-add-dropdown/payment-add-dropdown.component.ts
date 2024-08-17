import { Component, EventEmitter, Output } from '@angular/core';
import { PaymentRule } from 'src/app/_models/payment-rule';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-add-dropdown',
  templateUrl: './payment-add-dropdown.component.html',
  styleUrls: ['./payment-add-dropdown.component.css']
})
export class PaymentAddDropdownComponent {
  paymentRules: PaymentRule[] = [];
  defaultRule: PaymentRule = {
    id: 0,
    description: "Custom",
    percentage: 100,
    paymentMethodId: 0
  };
  @Output() selected = new EventEmitter<PaymentRule>();

  constructor(private paymentService: PaymentService) {
    this.paymentService.getPaymentRules().subscribe({
      next: paymentRules => this.paymentRules = paymentRules
    });
  }

  select(paymentRule: PaymentRule) {
    this.selected.emit(paymentRule);
  }
}
