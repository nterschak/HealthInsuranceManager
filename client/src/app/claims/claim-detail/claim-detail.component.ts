import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Claim } from '../../_models/claim';
import { ClaimService } from 'src/app/_services/claim.service';
import { PaymentAddConfiguration } from 'src/app/_configurations/payment-add-configuration';

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

  addPayment() {
    if (this.claim) {
      this.claimService.addPaymentWithModalForm(this.claim.id, this.getPaymentAddConfiguration());
    }
  }

  getPaymentAddConfiguration(): PaymentAddConfiguration {
    return {
      initialAmount: this.getRemainingBalance(),
      maxAmount: this.getRemainingBalance(),
      initialPaymentMethodId: 0
    }
  }

  getRemainingBalance(): number {
    if (this.claim?.payments) {
      let amount = this.claim.amountOwed - this.claim.payments.reduce((t, p) => t + p.amount, 0);
      return this.roundCurrency(amount);
    } else {
      return 0;
    }
  }

  getHraAmount() {
    if (this.claim) {
      let amount = this.claim.amountOwed * 0.75;
      return this.roundCurrency(amount);
    } else return 0;
  }

  getHsaAmount() {
    if (this.claim) {
      let amount = this.claim.amountOwed - this.getHraAmount();
      return this.roundCurrency(amount);
    } else return 0;
  }

  roundCurrency(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}