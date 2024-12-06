import { Jwt } from './jwt/jwt.strategy';

describe('Jwt', () => {
  it('should be defined', () => {
    expect(new Jwt()).toBeDefined();
  });
});
