abstract class AbstractAuthService {
  abstract getTokens(sub: number, role: string): Promise<string[]>;
}

export { AbstractAuthService };
