describe('registering a new user', () => {
    it('registers a new user successfully', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('test@test.com');
		cy.get('#rg-password').type('P@s$w0rd');
		cy.get('#rg-confirm-password').type('P@s$w0rd');
		cy.get('#rg-submit-register-button').click();

		// expect a successful registration message
		cy.get('#rg-success-message').should('exist');
    });

	it('detects an invalid email', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('testytest.com');
		cy.get('#rg-submit-register-button').click();

		cy.get('.rg-email-error').should('exist');
		cy.get('.rg-email-error').should('have.text', 'Invalid email format.');


	});

	it('detects a password which is too short', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('test@test.com');
		cy.get('#rg-submit-register-button').click();

		cy.get('#rg-password').type('123');

		cy.get('.rg-password-error').should('exist');
		cy.get('.rg-password-error').should('have.text', 'Password must be at least 8 characters.');
	});

	it('detects that passwords do not match', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('test@test.com');
		cy.get('#rg-submit-register-button').click();

		cy.get('#rg-password').type('123456789');
		cy.get('#rg-confirm-password').type('123456780');

		cy.get('.rg-confirm-password-error').should('exist');
		cy.get('.rg-confirm-password-error').should('have.text', 'Your passwords do not match.');
	});
  
   
  })