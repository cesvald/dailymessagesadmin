import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  messagesUrl = 'https://shakti-ma.herokuapp.com/';
  
  constructor( private http: HttpClient ) { }
  
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl + "messages");
  }
  
  getMessage(id: string): Observable<Message> {
    return this.http.get<Message>(this.messagesUrl + "messages/" + id);
  }
  
  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.messagesUrl + "messages", message);
  }
  
  updateMessage(message: Message): Observable<any> {
    return this.http.put(this.messagesUrl + "messages/" + message._id, message);
  }
  
  deleteMessage(message: Message | number): Observable<Message> {
    const id = typeof message === 'number' ? message : message._id;
    return this.http.delete<Message>(`${this.messagesUrl}messages/${id}`);
  }
}
