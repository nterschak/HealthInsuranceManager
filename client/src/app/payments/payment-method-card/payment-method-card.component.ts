import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-method-card',
  templateUrl: './payment-method-card.component.html',
  styleUrls: ['./payment-method-card.component.css']
})
export class PaymentMethodCardComponent {
  @Input() paymentMethod!: PaymentMethod;
  @Output() deleted = new EventEmitter<number>();

  constructor(private paymentService: PaymentService, private confirmService: ConfirmService) { }

  deletePaymentMethod() {
    this.confirmService.confirm('Confirm', 'Are you sure you want to delete this payment method?').subscribe({
      next: result => {
        if (result) {
          this.paymentService.removePaymentMethod(this.paymentMethod.id).subscribe({
            next: () => this.deleted.emit(this.paymentMethod.id)
          });
        }
      }
    });
  }
}
