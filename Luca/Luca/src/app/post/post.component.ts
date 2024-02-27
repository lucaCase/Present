import {Component, Input} from '@angular/core';
import {Post} from "../stack.model";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  @Input() communityId!: string;

  constructor(private client: ClientService) {}

  upvote() {
    this.client.upvotePost(this.communityId, this.post.id).subscribe(() => {
      this.post.ratio++;
    });
  }

  downvote() {
    this.client.downvotePost(this.communityId, this.post.id).subscribe(() => {
      this.post.ratio--;
    });
  }
}
