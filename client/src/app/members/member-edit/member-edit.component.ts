import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { DateService } from 'src/app/_services/date.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  memberForm: FormGroup;
  isNew = true;
  memberId?: number;

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private toastrService: ToastrService, private router: Router,
    private formBuilder: FormBuilder, private dateService: DateService
  ) {
    this.memberForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.memberId) {
      this.isNew = false;
      this.memberService.getMember(this.memberId).subscribe({
        next: member => {
          this.memberForm.setValue({
            firstName: member.firstName,
            lastName: member.lastName,
            dateOfBirth: this.dateService.createDateFromISOString(member.dateOfBirth)
          });
        }
      });
    }
  }

  submit() {
    if (this.isNew) this.addMember();
    else this.updateMember();
  }

  addMember() {
    this.memberService.addMember(this.memberForm.value).subscribe({
      next: response => {
        let member = response as Member;
        this.toastrService.success(`Added ${member?.firstName} to list of members!`);
        this.router.navigate(['members']);
      }
    });
  }  

  updateMember() {
    this.memberService.updateMember({id: this.memberId, ...this.memberForm.value}).subscribe({
      next: () => {
        const name = this.memberForm.get('firstName')?.value;
        this.toastrService.success(`${name}'s information successfuly updated!`);
        this.router.navigate(['members']);
      }
    });
  }
}