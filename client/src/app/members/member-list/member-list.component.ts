import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService, private toastrService: ToastrService,
    private confirmService: ConfirmService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    });
  }

  removeMember(member: Member) {
    this.confirmService
      .confirm('Confirmation', `Are you sure you want to remove ${member.firstName} from you list of members?`)
      .subscribe({
        next: result => {
          if (result) {
            this.memberService.removeMember(member.id).subscribe({
              next: _ => this.members = this.members.filter(m => m.id != member.id),
              error: _ => this.toastrService.error("Something went wrong.")
            });
          }
        }
    });
  }
}
