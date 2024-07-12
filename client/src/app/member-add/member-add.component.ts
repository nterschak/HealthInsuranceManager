import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  member?: Member;

  constructor(private memberService: MemberService, private router: Router,
    private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.member = {
      id: 0,
      firstName: "",
      lastName: "",
      dateOfBirth: new Date()
    };
  }

  submit() {
    if (this.member) {
      this.memberService.addMember(this.member).subscribe({
        next: response => {
          let member = response as Member;
          this.router.navigate(['members']);
          this.toastrService.success(`Added ${member?.firstName} to list of members!`);
        },
        error: () => this.toastrService.error('Something went wrong')
      });
    }
  }
}
