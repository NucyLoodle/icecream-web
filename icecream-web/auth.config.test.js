import { authConfig } from './auth.config';

describe('authConfig authorized callback', () => {
  const { authorized } = authConfig.callbacks;

  beforeAll(() => {
    global.Response = {
      redirect: jest.fn((url) => ({
        headers: new Map([['Location', url.toString()]]),
        status: 302,
      })),
    };
  });

  test('allows access when user is authenticated and on the dashboard', () => {
    const result = authorized({
      auth: { user: { id: '123' } },
      request: { nextUrl: new URL('https://example.com/dashboard') }
    });

    expect(result).toBe(true);
  });

  test('denies access when user is NOT authenticated and on the dashboard', () => {
    const result = authorized({
      auth: { user: null },
      request: { nextUrl: new URL('https://example.com/dashboard') }
    });

    expect(result).toBe(false);
  });

  test('redirects to /dashboard when user is authenticated but not on the dashboard', () => {
    const mockUrl = new URL('https://example.com/');
    const expectedRedirect = new URL('/dashboard', mockUrl);

    const result = authorized({
      auth: { user: { id: '123' } },
      request: { nextUrl: mockUrl }
    });

    expect(result.headers.get('Location')).toBe(expectedRedirect.toString());
  });

  test('allows access when user is NOT authenticated and not on the dashboard', () => {
    const result = authorized({
      auth: { user: null },
      request: { nextUrl: new URL('https://example.com/') }
    });

    expect(result).toBe(true);
  });
});
