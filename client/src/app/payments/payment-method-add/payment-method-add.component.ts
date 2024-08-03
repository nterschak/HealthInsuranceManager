import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-method-add',
  templateUrl: './payment-method-add.component.html',
  styleUrls: ['./payment-method-add.component.css']
})
export class PaymentMethodAddComponent {
  paymentMethod: PaymentMethod = {} as PaymentMethod;

  constructor(private paymentService: PaymentService, private router: Router,
    private toastrService: ToastrService
  ) {
    this.paymentMethod.paymentType = "";
  }

  submit() {
    this.paymentService.addPaymentMethod(this.paymentMethod).subscribe({
      next: () => {
        this.router.navigateByUrl('payment-methods');
        this.toastrService.success(`Payment method ${this.paymentMethod.lastFourDigits} added!`)
      }
    });
  }
}
