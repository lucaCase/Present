import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { CommunityComponent } from './community/community.component';
import {FormsModule} from "@angular/forms";
import { MemberComponent } from './member/member.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommunityComponent,
    MemberComponent,
    PostComponent,
    CommentComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
