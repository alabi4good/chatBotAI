import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewChatComponent } from './ai-new-chat';

import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AiService } from '../../service/ai';
import { ChatStorageService } from '../../service/chat-storage';

describe('NewChatComponent', () => {
  let component: NewChatComponent;
  let fixture: ComponentFixture<NewChatComponent>;
  let mockAiService: jasmine.SpyObj<AiService>;
  let mockChatStorageService: jasmine.SpyObj<ChatStorageService>;

  beforeEach(() => {
    mockAiService = jasmine.createSpyObj('AiService', ['getResponse']);
    mockChatStorageService = jasmine.createSpyObj('ChatStorageService', [
      'addMessage',
    ]);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NewChatComponent],
      providers: [
        { provide: AiService, useValue: mockAiService },
        { provide: ChatStorageService, useValue: mockChatStorageService },
      ],
    });

    fixture = TestBed.createComponent(NewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not send a prompt if input is empty or has whitespace', () => {
    component.userInput.setValue(' ');
    component.sendChat();
    expect(mockAiService.getResponse).not.toHaveBeenCalled();
  });

  it('should send chat and handle the response successfully', () => {
    const aiResponse = {
      choices: [{ message: { content: 'Hello Something!' } }],
    };

    mockAiService.getResponse.and.returnValue(of(aiResponse));
    component.userInput.setValue('Hi there!');
    component.sendChat();

    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
    expect(component.chats.length).toBe(1);
    expect(component.chats[0].ai).toBe('Hello Something!');
    expect(mockChatStorageService.addMessage).toHaveBeenCalled();
    expect(component.userInput.value).toBe('');
  });

  it('should handle error during chat', () => {
    mockAiService.getResponse.and.returnValue(
      throwError(() => new Error('Service failed'))
    );
    component.userInput.setValue('Test error');
    component.sendChat();

    expect(component.error).toBe(
      'Oops!! Something went wrong. Please try again later.'
    );
    expect(component.loading).toBeFalse();
  });

  it('should cleanup subscriptions on destroy', () => {
    spyOn(component.ngUnsubscribe, 'next');
    spyOn(component.ngUnsubscribe, 'complete');
    component.ngOnDestroy();
    expect(component.ngUnsubscribe.next).toHaveBeenCalled();
    expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
  });
});
