import { Injectable } from '@angular/core';
import { ClaimService } from './claim.service';
import { Claim } from '../_models/claim';
import { map, Observable, Subject } from 'rxjs';
import { MemberService } from './member.service';
import { ImportOperation } from '../_models/ImportOperation';

@Injectable({
  providedIn: 'root'
})
export class ClaimImportService {
  private csvRegex = /(?<=^|,)(?:([^,"]*)|"([^"]*)")(?=$|,)/g;

  private existingClaimSource = new Subject<Claim>();
  existingClaim$ = this.existingClaimSource.asObservable();

  private newClaimSource = new Subject<ImportOperation<Claim>>();
  newClaim$ = this.newClaimSource.asObservable();

  private invalidClaimSource = new Subject<Claim>();
  invalidClaim$ = this.invalidClaimSource.asObservable();

  constructor(private claimService: ClaimService, private memberService: MemberService) { }

  parseCSVFile(input: string) {
    let claims = input.split('\n').slice(1).map(l => this.parseClaimFromCSV(l));
    claims.forEach(c => {
      this.claimService.checkClaimExists(c.claimNumber).subscribe({
        next: exists => {
          if (exists) this.existingClaimSource.next(c);
          else {
            this.checkPatientIsValid(c).subscribe({
              next: id => {
                c.patientId = id;
                this.newClaimSource.next(new ImportOperation(c));
              },
              error: () => this.invalidClaimSource.next(c)
            })
          }
        }
      });
    });
  }

  parseClaimFromCSV(input: string): Claim {
    const numFields = 18;
    let data = input.match(this.csvRegex) as Array<string>;
    if (data.length !== numFields) throw new Error('Invalid csv string');
    data = data.map(d => d.replace(/"/g, '')).map(d => d.trim());
    return {
      id: 0,
      claimNumber: data[0],
      claimType: data[4],
      visitedProvider: data[3],
      dateVisited: data[2],
      dateProcessed: data[8],
      amountBilled: this.parseNumber(data[9]),
      amountDeductible: this.parseNumber(data[10]),
      amountPlanPaid: this.parseNumber(data[11]),
      amountPlanDiscount: this.parseNumber(data[12]),
      amountYourResponsibility: this.parseNumber(data[13]),
      amountPaidAtVisit: this.parseNumber(data[14]),
      amountOwed: this.parseNumber(data[15]),
      networkStatus: data[7].replace(/-/g, ' '),
      statusSummary: "Processed",
      patientId: 0,
      patientName: data[1],
    };
  }

  private parseNumber(input: string): number {
    return +input.replace(/[\$,]/g, '');
  }

  private checkPatientIsValid(claim: Claim): Observable<number> {
    return this.memberService.getMemberByName(claim.patientName).pipe(
      map(member => member.id)
    );
  }
}