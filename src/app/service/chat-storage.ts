import { Injectable } from '@angular/core';
import { AI } from '../models/ai.interface';
const STORAGE_KEY = 'chat-history';

@Injectable({ providedIn: 'root' })
export class ChatStorageService {
  private history: AI[] = [];

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.history = JSON.parse(stored);
    }
  }

  getChatHistory() {
    return [...this.history];
  }

  addMessage(message: AI) {
    this.history.push(message);

    // Keep only last 10
    if (this.history.length > 10) {
      this.history = this.history.slice(-10);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
  }

  clearChatHistory() {
    this.history = [];
    localStorage.removeItem(STORAGE_KEY);
  }
}
