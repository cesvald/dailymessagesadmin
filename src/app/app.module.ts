import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages-components/messages/messages.component';

import { FormsModule } from '@angular/forms';
import { MessageDetailComponent } from './messages-components/message-detail/message-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MessageNewComponent } from './messages-components/message-new/message-new.component'

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './services/request-interceptor.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth-components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageDetailComponent,
    MessageNewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
