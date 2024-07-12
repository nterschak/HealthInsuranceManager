import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'member');
  }

  getMember(id: number) {
    return this.http.get<Member>(this.baseUrl + 'member/' + id);
  }

  addMember(member: Member) {
    return this.http.post(this.baseUrl + 'member', member);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'member', {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      dateOfBirth: member.dateOfBirth.toJSON().slice(0, 10)
    });
  }
}
