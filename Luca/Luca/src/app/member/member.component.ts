import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../stack.model";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input("member") memberId!: string;
  member!: Member;

  constructor(private client: ClientService) {}

  ngOnInit(): void {
    this.client.getMember(this.memberId).subscribe((member: Member) => {
      this.member = member;
    });
  }
}
