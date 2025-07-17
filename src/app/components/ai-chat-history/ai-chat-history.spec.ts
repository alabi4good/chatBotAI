import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatHistoryComponent } from './ai-chat-history';
import { ChatStorageService } from '../../service/chat-storage';

describe('ChatHistory', () => {
  let component: ChatHistoryComponent;
  let fixture: ComponentFixture<ChatHistoryComponent>;
  let mockChatStorageService: jasmine.SpyObj<ChatStorageService>;

  beforeEach(async () => {
    mockChatStorageService = jasmine.createSpyObj('ChatStorageService', [
      'clearChatHistory',
    ]);

    await TestBed.configureTestingModule({
      imports: [ChatHistoryComponent],
      providers: [
        { provide: ChatStorageService, useValue: mockChatStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearChatHistory when clear() is invoked', () => {
    component.clear();
    expect(mockChatStorageService.clearChatHistory).toHaveBeenCalled();
  });
});
