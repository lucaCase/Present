import {Component} from '@angular/core';
import {ClientService} from "../client.service";
import {AccountService} from "../account.service";
import {CommunityService} from "../community.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = "";
  description: string = "";
  isPublic: boolean = true;

  constructor(private client: ClientService, private account: AccountService, public communities: CommunityService) {}

  addCommunity() {
    this.communities.addCommunity(this.name, this.description, this.isPublic);
  }
}
