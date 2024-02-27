import {Component, Input} from '@angular/core';
import {Comment} from "../stack.model";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() communityId!: string;
  @Input() postId!: string;


  constructor(private client: ClientService) {}

  upvote() {
    this.client.upvoteComment(this.communityId, this.postId, this.comment.id).subscribe(() => {
      this.comment.ratio++;
    });
  }

  downvote() {
    this.client.downvoteComment(this.communityId, this.postId, this.comment.id).subscribe(() => {
      this.comment.ratio--;
    });
  }
}
