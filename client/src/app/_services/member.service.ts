import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private dateService: DateService) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'member');
  }

  getMember(id: number) {
    return this.http.get<Member>(this.baseUrl + 'member/' + id);
  }

  getMemberByName(name: string) {
    return this.http.get<Member>(this.baseUrl + 'member/by-name/' + name);
  }

  checkExistsByName(name: string) {
    return this.http.get<number | null>(this.baseUrl + 'member/exists-by-name/' + name);
  } 

  addMember(member: Member) {
    return this.http.post(this.baseUrl + 'member', {
      firstName: member.firstName,
      lastName: member.lastName,
      dateOfBirth: this.dateService.getLocalDateString(member.dateOfBirth)
    });
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'member', {
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      dateOfBirth: this.dateService.getLocalDateString(member.dateOfBirth)
    });
  }

  removeMember(memberId: number) {
    return this.http.delete(this.baseUrl + 'member/' + memberId);
  }
}
