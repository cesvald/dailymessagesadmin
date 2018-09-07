import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {
  
  message: Message;
  message_id: string;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.setMessage();
  }
  
  setMessage(): void {
    this.message_id = this.route.snapshot.paramMap.get('id');
    if(this.message_id != null) this.messageService.getMessage(this.message_id).subscribe(message => this.message = message);
    else this.message = new Message()
  }
  
  add_update(): void {
    this.message.content = this.message.content.trim();
    this.message.title = this.message.title.trim();
    if (!this.message.title) { return; }
    if (!this.message.content) { return; }
    if (!this.message.date) { return; }
    if(this.message_id != null) this.messageService.updateMessage(this.message).subscribe( () => this.goBack() );
    else this.messageService.addMessage(this.message).subscribe(message => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
