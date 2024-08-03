import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {
  paymentMethods: PaymentMethod[] = [];

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods() {
    this.paymentService.getPaymentMethods().subscribe({
      next: paymentMethods => this.paymentMethods = paymentMethods
    });
  }

  removePayment(id: number) {
    this.paymentMethods = this.paymentMethods.filter(p => p.id !== id);
  }
}
