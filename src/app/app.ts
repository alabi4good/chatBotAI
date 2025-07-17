import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';
import { NewChatComponent } from './components/ai-new-chat/ai-new-chat';
import { ChatHistoryComponent } from './components/ai-chat-history/ai-chat-history';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatTabsModule,
    NewChatComponent,
    ChatHistoryComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'huggingFaceChatBotAI';
}
