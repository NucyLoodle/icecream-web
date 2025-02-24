import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationPage from './page';

jest.mock("../lib/actions", () => ({
    authenticate: jest.fn(),
    signUp: jest.fn(),
  }));

describe("registration page component", () => {
    it("renders correctly", () => {
        render(<RegistrationPage />);
        expect(screen).toBeDefined();
    });

    it('displays the error message when passwords do not match', async () => {
        render(<RegistrationPage />);
        
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText("Password:", { selector: 'input' });
        const confirmPasswordInput = screen.getByLabelText("Confirm Password:", { selector: 'input' });
        const submitButton = screen.getByTestId("submit-button");
    
        // Simulate user typing
        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    
        // Simulate form submission
        fireEvent.click(submitButton);
    
        // Expect the error message to appear
        expect(await screen.findByText(/Passwords don't match/i)).toBeInTheDocument();
    });
});