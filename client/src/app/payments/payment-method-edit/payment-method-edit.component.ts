import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {
  paymentMethodForm: FormGroup;
  isNew = true;
  paymentMethodId?: number;

  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router,
    private toastrService: ToastrService, private formBuilder: FormBuilder
  ) {
    this.paymentMethodForm = formBuilder.group({
      lastFourDigits: ['', [Validators.required, Validators.pattern('\\d{4}')]],
      paymentType: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.paymentMethodId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.paymentMethodId) {
      this.isNew = false;
      this.paymentService.getPaymentMethodById(this.paymentMethodId).subscribe({
        next: paymentMethod => {
          this.paymentMethodForm.setValue({
            lastFourDigits: paymentMethod.lastFourDigits,
            paymentType: paymentMethod.paymentType,
            description: paymentMethod.description
          });
        }
      });
    }
  }

  submit() {
    if (this.isNew) this.addPaymentMethod();
    else this.updatePaymentMethod();
  }  

  addPaymentMethod() {
    this.paymentService.addPaymentMethod(this.paymentMethodForm.value).subscribe({
      next: (paymentMethod: any) => {
        this.toastrService.success(`Payment method ${paymentMethod.lastFourDigits} added!`);
        this.router.navigate(['payments']);
      }
    });
  }

  updatePaymentMethod() {
    this.paymentService.updatePaymentMethod({id: this.paymentMethodId, ...this.paymentMethodForm.value}).subscribe({
      next: () => {
        const lastFourDigits = this.paymentMethodForm.get('lastFourDigits')?.value;
        this.toastrService.success(`Payment method ${lastFourDigits} updated!`);
        this.router.navigate(['payments']);
      }
    })
  }
}