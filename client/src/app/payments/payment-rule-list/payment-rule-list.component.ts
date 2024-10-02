import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentRule } from 'src/app/_models/payment-rule';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-rule-list',
  templateUrl: './payment-rule-list.component.html',
  styleUrls: ['./payment-rule-list.component.css']
})
export class PaymentRuleListComponent {
  paymentRules: PaymentRule[] = [];

  constructor(private paymentService: PaymentService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.loadPaymentRules();
  }

  loadPaymentRules() {
    this.paymentService.getPaymentRules().subscribe({
      next: paymentRules => this.paymentRules = paymentRules
    });
  }

  removePaymentRule(paymentRule: PaymentRule) {
    this.confirmService
      .confirm('Confirmation', `Are you sure you want to remove this payment rule?`)
      .subscribe({
        next: result => {
          if (result) {
            this.paymentService.removePaymentRule(paymentRule.id).subscribe({
              next: () => this.paymentRules = this.paymentRules.filter(p => p.id != paymentRule.id)
            });
          }
        }
    });
  }
}