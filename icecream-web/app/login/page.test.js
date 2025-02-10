import { render, screen } from '@testing-library/react';
import LoginPage from './page';

describe("login page component", () => {
    it("renders correctly", () => {
        render(<LoginPage />);
        expect(screen).toBeDefined();
    });
});