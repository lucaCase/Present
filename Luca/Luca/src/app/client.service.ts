import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Community, Member} from "./stack.model";

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private readonly API_URL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getCommunities() {
    return this.http.get<Array<Community>>(`${this.API_URL}/communities`);
  }

  getCommunity(id: string) {
    return this.http.get<Community>(`${this.API_URL}/communities/${id}`);
  }

  createCommunity(name: string, description: string, isPublic: boolean, creator: string) {
    return this.http.post<Community>(`${this.API_URL}/communities`, {name, description, creator: creator, isPublic: isPublic});
  }

  getMembers() {
    return this.http.get<Array<Member>>(`${this.API_URL}/users`);
  }

  getMember(id: string) {
    return this.http.get<Member>(`${this.API_URL}/users/${id}`);
  }

  createMember(name: string, email: string, password: string) {
    return this.http.post<Member>(`${this.API_URL}/users`, {name, email, password});
  }

  joinCommunity(id: string, userId: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/join/${id}`, {id: userId});
  }

  leaveCommunity(id: string, userId: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/leave/${id}`, {id: userId});
  }

  postInCommunity(id: string, userId: string, title: string, content: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/post/${id}`, {creator: userId, title, content});
  }

  commentOnPost(communityId: string, postId: string, userId: string, content: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/${communityId}/posts/${postId}`, {creator: userId, content});
  }

  upvotePost(communityId: string, postId: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/${communityId}/up`, {postId});
  }

  downvotePost(communityId: string, postId: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/${communityId}/down`, {postId});
  }

  upvoteComment(communityId: string, postId: string, commentId: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/${communityId}/posts/${postId}/up`, {commentId});
  }

  downvoteComment(communityId: string, postId: string, commentId: string) {
    return this.http.post<Member>(`${this.API_URL}/communities/${communityId}/posts/${postId}/down`, {commentId});
  }
}
