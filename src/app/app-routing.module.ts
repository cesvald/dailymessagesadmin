import { NgModule } from '@angular/core';
import { MessagesComponent } from './messages-components/messages/messages.component';
import { MessageDetailComponent } from './messages-components/message-detail/message-detail.component';
import { MessageNewComponent } from './messages-components/message-new/message-new.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'messages', component: MessagesComponent },
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'message/:id', component: MessageDetailComponent },
  { path: 'messages/new', component: MessageNewComponent },
  { path: 'messages/:id/edit', component: MessageNewComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
