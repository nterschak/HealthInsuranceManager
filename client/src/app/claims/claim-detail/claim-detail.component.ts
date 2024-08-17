import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Claim } from '../../_models/claim';
import { ClaimService } from 'src/app/_services/claim.service';
import { PaymentAddConfiguration } from 'src/app/_configurations/payment-add-configuration';
import { PaymentRule } from 'src/app/_models/payment-rule';

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
      this.claimService.addReimbursementWithModalForm(this.claim.id, this.getHraAmount(), this.claim.amountOwed);
    }
  }

  addPayment(config?: PaymentAddConfiguration) {
    if (this.claim) {
      if (!config) config = this.getDefaultPaymentAddConfiguration();
      this.claimService.addPaymentWithModalForm(this.claim.id, config);
    }
  }

  addPaymentFromRule(rule: PaymentRule) {
    if (this.claim) {
      let config = this.getPaymentAddConfigurationFromRule(rule)
      this.addPayment(config);
    }
  }

  getDefaultPaymentAddConfiguration(): PaymentAddConfiguration {
    const remainingBalance = this.getRemainingBalance();
    return {
      initialAmount: remainingBalance,
      maxAmount: remainingBalance,
      initialPaymentMethodId: 0
    }
  }

  getPaymentAddConfigurationFromRule(rule: PaymentRule): PaymentAddConfiguration {
    const remainingBalance = this.getRemainingBalance();
    return {
      initialAmount: this.roundCurrency(remainingBalance * rule.percentage / 100),
      maxAmount: remainingBalance,
      initialPaymentMethodId: rule.paymentMethodId
    };
  }

  getRemainingBalance(): number {
    if (this.claim?.payments) {
      let amount = this.claim.amountOwed - this.claim.payments.reduce((t, p) => t + p.amount, 0);
      return this.roundCurrency(amount);
    } else {
      return 0;
    }
  }

  getHraAmount(): number {
    if (this.claim) {
      let amount = this.claim.amountOwed * 0.75;
      return this.roundCurrency(amount);
    } else return 0;
  }

  getHsaAmount(): number {
    if (this.claim) {
      let amount = this.claim.amountOwed - this.getHraAmount();
      return this.roundCurrency(amount);
    } else return 0;
  }

  roundCurrency(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}