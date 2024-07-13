import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from '../_models/claim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getClaims() {
    return this.http.get<Claim[]>(this.baseUrl + 'claims');
  }

  getClaim(id: number) {
    return this.http.get<Claim>(this.baseUrl + 'claims/' + id);
  }

  getUnpaidClaims() {
    return this.http.get<Claim>(this.baseUrl + 'claims/unpaid');
  }

  getClaimByClaimNumber(claimNumber: string) {
    return this.http.get<Claim>(this.baseUrl + 'claims/claim-number/' + claimNumber);
  }  
}
