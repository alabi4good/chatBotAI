import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { InferenceClient } from '@huggingface/inference';
import { environment } from '../../../environment';
import { HuggingFaceTokenFactory } from '../factory/huggingFace.factory';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  //using factory pattern to get token based on environment. Assuming tokens are not the same in different envs
  private client = new InferenceClient(HuggingFaceTokenFactory.getToken());

  getResponse(prompt: string): Observable<any> {
    return from(
      this.client.chatCompletion({
        model: 'meta-llama/Llama-3.1-8B-Instruct',
        messages: [{ role: 'user', content: prompt }],
      })
    );
  }
}
