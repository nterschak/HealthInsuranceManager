import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  paymentForm: FormGroup;
  paymentMethods: PaymentMethod[] = [];
  result = false;

  constructor(public bsModalRef: BsModalRef, private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {
    this.paymentService.getPaymentMethods().subscribe({
      next: paymentMethods => this.paymentMethods = paymentMethods
    });
    this.paymentForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      datePaid: [new Date(), Validators.required],
      paymentMethodId: [0, [Validators.required, Validators.min(1)]]
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