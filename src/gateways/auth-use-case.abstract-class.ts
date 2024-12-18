abstract class AbstractAuthUseCase {
  abstract getAuthUrl(): string;
  abstract getTokens(code: string): Promise<any>;
}

export { AbstractAuthUseCase };
