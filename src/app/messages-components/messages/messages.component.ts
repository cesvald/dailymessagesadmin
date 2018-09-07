import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
  
  messages: Message[];
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }
  
  getMessages(): void {
    this.messageService.getMessages().subscribe(messages => {this.messages = messages; console.log(messages)});
  }
  
  delete(message: Message): void {
    this.messages = this.messages.filter(m => m !== message);
    this.messageService.deleteMessage(message).subscribe();
  }
}