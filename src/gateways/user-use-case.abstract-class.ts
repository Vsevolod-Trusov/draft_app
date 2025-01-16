import { AbstractBaseUseCase } from './use-case.abstract-class';

abstract class AbstractUserUseCase extends AbstractBaseUseCase {
  abstract getByFilter(options: unknown): Promise<unknown>;
}

export { AbstractUserUseCase };
