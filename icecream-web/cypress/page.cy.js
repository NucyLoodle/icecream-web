import LandingPage from'./page';

describe('Landing Page component', () => {
    it('renders component correctly', () => {
        cy.mount(<LandingPage />)
        cy.get('#lp-content-container').should('exist');
    });
});