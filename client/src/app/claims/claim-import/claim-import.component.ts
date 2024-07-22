import { Component } from '@angular/core';
import { Claim } from 'src/app/_models/claim';
import { ClaimImportService } from 'src/app/_services/claim-import.service';
import { ClaimService } from 'src/app/_services/claim.service';

@Component({
  selector: 'app-claim-import',
  templateUrl: './claim-import.component.html',
  styleUrls: ['./claim-import.component.css']
})
export class ClaimImportComponent {
  newClaims: Claim[] = [];
  existingClaims: Claim[] = [];
  invalidClaims: Claim[] = [];
  reader = new FileReader();
  fileTypeOk = true;

  constructor(private claimImportService: ClaimImportService, private claimService: ClaimService) {
    this.claimImportService.newClaim$.subscribe(c => this.newClaims.push(c));
    this.claimImportService.existingClaim$.subscribe(c => this.existingClaims.push(c));
    this.claimImportService.invalidClaim$.subscribe(c => this.invalidClaims.push(c));

    this.reader.addEventListener('load', () => {
      if (typeof(this.reader.result) === 'string') {
        this.claimImportService.parseCSVFile(this.reader.result);
      }
    });
  }

  readFile(event: any) {
    this.reset();
    if (event.target.files?.length === 1) {
      this.fileTypeOk = true;
      const file = event.target.files[0];
      this.reader.readAsText(file);
    } else {
      this.fileTypeOk = false;
    }
  }

  importNewClaims() {
    this.newClaims.forEach((c, i) => {
      this.claimService.addClaim(c).subscribe({
        next: response => {
          let claim = response as Claim;
          this.newClaims[i] = claim;
        }
      })
    })
  }

  reset() {
    this.newClaims = [];
    this.existingClaims = [];
    this.invalidClaims = [];
  }
}
