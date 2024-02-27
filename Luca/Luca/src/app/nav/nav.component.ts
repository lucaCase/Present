import { Component } from '@angular/core';
import {AccountService} from "../account.service";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private account: AccountService, private client: ClientService) {}

  createUser() {

  }
}
