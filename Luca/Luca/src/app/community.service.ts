import {Injectable} from '@angular/core';
import {Community} from "./stack.model";
import {ClientService} from "./client.service";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  communities: Array<Community> = [];
  constructor(private client: ClientService, private account: AccountService) {
    this.client.getCommunities().subscribe((communities: Array<Community>) => {
      this.communities = communities;
    });
  }

  addCommunity(name: string, description: string, isPublic: boolean) {
    this.client.createCommunity(name, description, isPublic, this.account.member.id).subscribe((community: Community) => {
      this.communities.push(community);
    });
  }
}
