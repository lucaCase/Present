import {Component, Input} from '@angular/core';
import {Community} from "../stack.model";
import {AccountService} from "../account.service";
import {ClientService} from "../client.service";
import {CommunityService} from "../community.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  @Input() community!: Community;

  constructor(private account: AccountService, private client: ClientService, public communities: CommunityService) {}

  joinCommunity() {
    this.client.joinCommunity(this.community.id, this.account.member.id).subscribe(member => {
      this.community.members.push(member.id);
    });
  }
}
