import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-method-add',
  templateUrl: './payment-method-add.component.html',
  styleUrls: ['./payment-method-add.component.css']
})
export class PaymentMethodAddComponent {
  paymentMethodForm: FormGroup;

  constructor(private paymentService: PaymentService, private router: Router,
    private toastrService: ToastrService, private formBuilder: FormBuilder
  ) {
    this.paymentMethodForm = formBuilder.group({
      lastFourDigits: ['', [Validators.required, Validators.pattern('\\d{4}')]],
      paymentType: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit() {
    this.paymentService.addPaymentMethod(this.paymentMethodForm.value).subscribe({
      next: (paymentMethod: any) => {
        this.router.navigateByUrl('payment-methods');
        this.toastrService.success(`Payment method ${paymentMethod.lastFourDigits} added!`)
      }
    });
  }
}