import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PaymentAddConfiguration } from 'src/app/_configurations/payment-add-configuration';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {
  paymentForm?: FormGroup;
  paymentMethods: PaymentMethod[] = [];
  result = false;
  config: PaymentAddConfiguration = {} as PaymentAddConfiguration;

  constructor(public bsModalRef: BsModalRef, private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {
    this.paymentService.getPaymentMethods().subscribe({
      next: paymentMethods => this.paymentMethods = paymentMethods
    });
  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      amount: [this.config.initialAmount, [Validators.required, Validators.min(0.01), Validators.max(this.config.maxAmount)]],
      datePaid: [new Date(), Validators.required],
      paymentMethodId: [this.config.initialPaymentMethodId, [Validators.required, Validators.min(1)]]
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