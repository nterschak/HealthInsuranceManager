import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reimbursement-add',
  templateUrl: './reimbursement-add.component.html',
  styleUrls: ['./reimbursement-add.component.css']
})
export class ReimbursementAddComponent {
  reimbursementForm: FormGroup;
  result = false;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) {
    this.reimbursementForm = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(0.01)]],
      dateSubmitted: [new Date(), Validators.required]
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