import {HostListener, Injectable} from '@angular/core';
import {Member} from "./stack.model";
import {ClientService} from "./client.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  member!: Member;
  constructor(private client: ClientService) {

    let memberId: string = localStorage.getItem("memberId") || "";
    if (memberId) {
      this.client.getMember(memberId).subscribe((member: Member) => {
        this.member = member;
      });
    }
  }

  hashPassword(password: string): number {
    let hash = 0;
    for (let i = 0, len = password.length; i < len; i++) {
      let chr = password.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }

  @HostListener("window:beforeunload", ["$event"])
  unloadHandler(event: Event) {
    if (this.member) {
      localStorage.setItem("memberId", this.member.id);
    }
  }
}
