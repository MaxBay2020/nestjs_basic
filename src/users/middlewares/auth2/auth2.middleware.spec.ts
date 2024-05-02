import { Auth2Middleware } from './auth2.middleware';

describe('Auth2Middleware', () => {
  it('should be defined', () => {
    expect(new Auth2Middleware()).toBeDefined();
  });
});
