import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

declare const puter: any;

@Injectable({
  providedIn: 'root',
})
export class AiService {
  // for demo purposes as this does not require toekns, backend setup or API keys, perfect for the purpose of this demo
  getResponse(prompt: string): Observable<any> {
    return from(puter.ai.chat(prompt, { model: 'gpt-4o' }));
  }
}
