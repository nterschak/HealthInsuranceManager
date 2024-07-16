import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Payment } from 'src/app/_models/payment';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent {
  payment = {} as Payment;
  paymentMethods: PaymentMethod[] = [];
  result = false;

  constructor(public bsModalRef: BsModalRef, private paymentService: PaymentService) {
    this.paymentService.getPaymentMethods().subscribe({
      next: paymentMethods => this.paymentMethods = paymentMethods
    });
  }

  submit() {
    this.result = true;
    this.bsModalRef.hide();
  }

  cancel() {
    this.bsModalRef.hide();
  }
}