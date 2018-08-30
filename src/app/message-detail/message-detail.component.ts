import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  
  message: Message;
  
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMessage();
  }
  
  getMessage(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.messageService.getMessage(id).subscribe(message => this.message = message);
  }
  
  goBack(): void {
    this.location.back();
  }
  
}
