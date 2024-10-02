import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethod } from 'src/app/_models/payment-method';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-rule-edit',
  templateUrl: './payment-rule-edit.component.html',
  styleUrls: ['./payment-rule-edit.component.css']
})
export class PaymentRuleEditComponent implements OnInit {
  paymentRuleForm: FormGroup;
  isNew = true;
  paymentRuleId?: number;
  paymentMethods: PaymentMethod[] = [];  

  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router,
    private toastrService: ToastrService, private formBuilder: FormBuilder
  ) {
    this.paymentRuleForm = formBuilder.group({
      description: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      paymentMethodId: [0, [Validators.required, Validators.min(1)]]
    });
    this.paymentService.getPaymentMethods().subscribe({
      next: paymentMethods => this.paymentMethods = paymentMethods
    });    
  }

  ngOnInit(): void {
    this.paymentRuleId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.paymentRuleId) {
      this.isNew = false;
      this.paymentService.getPaymentRuleById(this.paymentRuleId).subscribe({
        next: paymentRule => {
          this.paymentRuleForm.setValue({
            description: paymentRule.description,
            percentage: paymentRule.percentage,
            paymentMethodId: paymentRule.paymentMethodId
          });
        }
      });
    }
  }

  submit() {
    if (this.isNew) this.addPaymentRule();
    else this.updatePaymentRule();
  }  

  addPaymentRule() {
    this.paymentService.addPaymentRule(this.paymentRuleForm.value).subscribe({
      next: () => {
        this.toastrService.success(`Payment rule added!`);
        this.router.navigate(['payments']);
      }
    });
  }

  updatePaymentRule() {
    this.paymentService.updatePaymentRule({id: this.paymentRuleId, ...this.paymentRuleForm.value}).subscribe({
      next: () => {
        this.toastrService.success(`Payment rule updated!`);
        this.router.navigate(['payments']);
      }
    })
  }  
}