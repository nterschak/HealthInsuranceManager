import { Component, Input } from '@angular/core';
import { PaymentMethod } from 'src/app/_models/payment-method';

@Component({
  selector: 'app-payment-method-card',
  templateUrl: './payment-method-card.component.html',
  styleUrls: ['./payment-method-card.component.css']
})
export class PaymentMethodCardComponent {
  @Input() paymentMethod!: PaymentMethod;
}
