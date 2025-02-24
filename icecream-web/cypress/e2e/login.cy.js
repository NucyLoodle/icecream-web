describe('logging in', () => {
  it('logs a registered user in successfully', () => {
    cy.visit('/');

    cy.get('#get-started-btn').click();
    cy.location('pathname').should('include', 'login')
    cy.get('#lg-login-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');
    cy.get('#lg-email').type(Cypress.env('TEST_EMAIL'));
    cy.get('#lg-password').type(Cypress.env('TEST_PASSWORD'));
    cy.get('#lg-submit-login-button').click();
    cy.location('pathname').should('include', 'dashboard');
  });

  it('does not log in an unregistered user', () => {
    cy.visit('/');

    cy.get('#get-started-btn').click();
    cy.location('pathname').should('include', 'login')
    cy.get('#lg-login-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');
    cy.get('#lg-email').type('email@email.com');
    cy.get('#lg-password').type('password');
    cy.get('#lg-submit-login-button').click();
    cy.location('pathname').should('include', 'login');
    cy.get('#lg-error-message').should('contain', 'Invalid credentials');
    });

    it('identifies invalid email addresses', () => {
      cy.visit('/');
      cy.get('#get-started-btn').click();
      cy.location('pathname').should('include', 'login')
      cy.get('#lg-login-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');
      cy.get('#lg-email').type('email');
      cy.get('.lg-email-error').should('contain', 'Invalid email format.');


    });
})