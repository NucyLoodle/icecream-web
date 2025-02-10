import { render, screen } from '@testing-library/react';
import LandingPage from './page';

describe("landing page component", () => {
    it('renders correctly', () => {
        render(<LandingPage/>);
        expect(screen).toBeDefined();
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent("Where's My Icecream?")
    });

    it('renders the heading correctly', () => {
        render(<LandingPage/>);
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent("Where's My Icecream?")
    });

    it('renders the icecream truck image', () => {
        render(<LandingPage/>);
        const image = screen.getByAltText("vintage ice cream truck graphic")
        expect(image).toBeInTheDocument()
    });

    it('renders the text content', () => {
        render(<LandingPage/>);
        const textContent = screen.getByText(/We’ve all been there/i)
        expect(textContent).toBeInTheDocument()
    });

    it('renders the get started link', () => {
        render(<LandingPage/>);
        const link = screen.getByText(/Let's get started!/i)
        expect(link).toBeInTheDocument()
    });


});