import { Component, OnDestroy } from '@angular/core';
import { AiService } from '../../service/ai';
import { ChatStorageService } from '../../service/chat-storage';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AI } from '../../models/ai.interface';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-chat',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ai-new-chat.html',
  styleUrl: './ai-new-chat.css',
})
export class NewChatComponent implements OnDestroy {
  userInput = new FormControl('');
  loading = false;
  error = '';
  chats: AI[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private aiService: AiService,
    private chatStorageService: ChatStorageService
  ) {}

  sendChat() {
    if (!this.userInput.value?.trim()) return;

    this.loading = true;
    this.error = '';

    this.aiService
      .getResponse(this.userInput.value)
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (res) => {
          const reply = res.choices?.[0]?.message?.content || '[No response]'; // grab the response
          const msg: AI = { user: this.userInput.value as string, ai: reply };
          this.chats.push(msg);
          this.chatStorageService.addMessage(msg);
          this.userInput.setValue('');
        },
        error: () => {
          this.error = 'Oops!! Something went wrong. Please try again later.'; // friendly error message if error occurs
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
