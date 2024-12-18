abstract class AbstractJwtAuthService {
  abstract getTokens(sub: number, role: string): Promise<string[]>;
}

export { AbstractJwtAuthService };
