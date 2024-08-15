import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reimbursement-add',
  templateUrl: './reimbursement-add.component.html',
  styleUrls: ['./reimbursement-add.component.css']
})
export class ReimbursementAddComponent implements OnInit {
  reimbursementForm?: FormGroup;
  result = false;
  initialAmount = 0;
  maxAmount = 0;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reimbursementForm = this.formBuilder.group({
      amount: [this.initialAmount, [Validators.required, Validators.min(0.01), Validators.max(this.maxAmount)]],
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