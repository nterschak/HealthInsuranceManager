import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member?: Member;
  @ViewChild('editForm') editForm?: NgForm

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.memberService.getMember(id).subscribe({
      next: member => {
        this.member = member;
        this.member.dateOfBirth = new Date(member.dateOfBirth + 'T00:00:00');
      }
    })
  }

  submit() {
    if (this.member) {
      this.memberService.updateMember(this.member).subscribe({
        next: () => {
          this.toastrService.success('Member updated!');
          this.editForm?.reset(this.member);
        }
      });
    }
  }
}
