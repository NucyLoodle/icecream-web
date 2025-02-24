import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/login/page';

jest.mock('../ui/login-form', () => () => <div data-testid="mock-login-form">Login Form</div>);

describe('LoginPage Component', () => {
  test('renders login and register buttons', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('register button contains a link to registration page', () => {
    render(<LoginPage />);
    
    const registerLink = screen.getByText('Register').closest('a');
    expect(registerLink).toHaveAttribute('href', '/registration');
  });

  test('renders LoginForm component inside Suspense', () => {
    render(<LoginPage />);
    
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();
  });
});
