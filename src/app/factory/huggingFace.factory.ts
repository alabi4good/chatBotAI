import { environment } from '../environment';

export class HuggingFaceTokenFactory {
  private static readonly tokenDictionary = {
    ['localhost']: environment.huggingeFaceTokenDev,
    ['dev']: environment.huggingeFaceTokenDev,
    ['qa']: environment.huggingeFaceTokenQA,
  };

  static getToken(): string {
    const hostname = window.location.hostname.toLowerCase();
    const match = Object.entries(this.tokenDictionary).find(([key]) =>
      hostname.includes(key)
    );
    return match?.[1] ?? environment.huggingeFaceTokenDev;
  }
}
