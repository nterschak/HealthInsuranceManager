import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/_models/claim';
import { ClaimParams } from 'src/app/_models/claimParams';
import { Member } from 'src/app/_models/member';
import { Reimbursement } from 'src/app/_models/reimbursement';
import { ClaimService } from 'src/app/_services/claim.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  members: Member[] = [];
  years: number[] = [];
  claimParams: ClaimParams = {} as ClaimParams;
  claims: Claim[] = [];
  selectedClaimId: number = 0;
  selectedClaim?: Claim;

  constructor(private claimService: ClaimService, private memberService: MemberService) {
    this.initializeFilters();

    this.claimService.claimUpdated$.subscribe({
      next: claim => {
        if (claim) {
          this.claims.forEach((c, i) => {
            if (c.id === claim.id)
              this.claims[i] = claim;
          });
          this.updateSelectedClaim(this.selectedClaimId);
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadClaims();
    this.loadMembers();
  }

  initializeFilters() {
    const currentYear = new Date().getFullYear();

    this.claimParams.year = currentYear;
    this.claimParams.unpaidOnly = true;
    this.claimParams.patientId = 0;

    for (let i = 0; i < 5; i++) {
      this.years.push(currentYear - i);
    }
  }

  loadClaims() {
    this.claimService.getClaims(this.claimParams).subscribe({
      next: claims => this.claims = claims
    });
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    });
  }

  updateSelectedClaim(id: number) {
    this.selectedClaimId = id;
    this.claimService.getClaim(id).subscribe({
      next: claim => this.selectedClaim = claim
    })
  }
}