import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/_models/claim';
import { Reimbursement } from 'src/app/_models/reimbursement';
import { ClaimService } from 'src/app/_services/claim.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  claims: Claim[] = [];
  selectedClaimId: number = 0;
  selectedClaim?: Claim;

  constructor(private claimService: ClaimService) {
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
    this.claimService.getClaims().subscribe({
      next: claims => this.claims = claims
    })
  }

  updateSelectedClaim(id: number) {
    this.selectedClaimId = id;
    this.claimService.getClaim(id).subscribe({
      next: claim => this.selectedClaim = claim
    })
  }
}
