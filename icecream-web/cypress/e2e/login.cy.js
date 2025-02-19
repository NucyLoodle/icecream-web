describe('logging in', () => {
  it('logs a registered user in successfully', () => {
    cy.visit('/');

    cy.get('#get-started-btn').click();
    cy.location('pathname').should('include', 'login')

    cy.get('#lg-email').type(Cypress.env('TEST_EMAIL'));
    cy.get('#lg-password').type(Cypress.env('TEST_PASSWORD'));
    cy.get('#lg-submit-login-button').click();
    cy.location('pathname').should('include', 'dashboard');
  });

  it('does not log in an unregistered user', () => {
    cy.visit('/');

    cy.get('#get-started-btn').click();
    cy.location('pathname').should('include', 'login')

    cy.get('#lg-email').type('email');
    cy.get('#lg-password').type('password');
    cy.get('#lg-submit-login-button').click();
    cy.location('pathname').should('include', 'login');
    cy.get('#lg-error-message').should('contain', 'Invalid credentials');

    });
})