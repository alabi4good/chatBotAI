import { Component } from '@angular/core';
import { ChatStorageService } from '../../service/chat-storage';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, CommonModule, MatButtonModule],
  templateUrl: './ai-chat-history.html',
  styleUrl: './ai-chat-history.css',
})
export class ChatHistoryComponent {
  constructor(public chatStoreService: ChatStorageService) {}

  clear() {
    this.chatStoreService.clearChatHistory();
  }
}
