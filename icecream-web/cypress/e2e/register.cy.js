import { buildUser } from '../../app/lib/generate';

describe('registering a new user', () => {
    it('registers a new user successfully', () => {
		const user = buildUser();
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type(user.email);
		cy.get('#rg-password').type(user.password);
		cy.get('#rg-confirm-password').type(user.password);
		cy.get('#rg-submit-register-button').click();

		// expect a successful registration message
		cy.location('pathname').should('include', 'login');
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
		cy.get('.rg-email-error').should('have.text', 'Please enter a valid email.');

		cy.get('#rg-submit-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-email').should('have.value', 'testytest.com');

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

		cy.get('#rg-submit-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-email').should('have.value', 'test@test.com');
		cy.get('#rg-password').should('have.value', '123');
	});

	it('detects a password which does not contain a letter', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('test@test.com');
		cy.get('#rg-submit-register-button').click();

		cy.get('#rg-password').type('1234567899');

		cy.get('.rg-password-error').should('exist');
		cy.get('.rg-password-error').should('have.text', 'Contain at least one letter.');

		cy.get('#rg-submit-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-email').should('have.value', 'test@test.com');
		cy.get('#rg-password').should('have.value', '1234567899');
	});

	it('detects a password which does not contain a number', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('test@test.com');
		cy.get('#rg-submit-register-button').click();

		cy.get('#rg-password').type('qwertyuio');

		cy.get('.rg-password-error').should('exist');
		cy.get('.rg-password-error').should('have.text', 'Contain at least one number.');

		cy.get('#rg-submit-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-email').should('have.value', 'test@test.com');
		cy.get('#rg-password').should('have.value', 'qwertyuio');
	});

	it('detects a password which does not contain a special character', () => {
		cy.visit('/');

		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type('test@test.com');
		cy.get('#rg-submit-register-button').click();

		cy.get('#rg-password').type('qwertyuio2');

		cy.get('.rg-password-error').should('exist');
		cy.get('.rg-password-error').should('have.text', 'Contain at least one special character.');

		cy.get('#rg-submit-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-email').should('have.value', 'test@test.com');
		cy.get('#rg-password').should('have.value', 'qwertyuio2');
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
		cy.get('.rg-confirm-password-error').should('have.text', "Passwords don't match");

		cy.get('#rg-submit-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-email').should('have.value', 'test@test.com');
		cy.get('#rg-password').should('have.value', '123456789');
		cy.get('#rg-confirm-password').should('have.value', '123456780');
	});

	it('detects a user who is already registered', () => {
		const user = buildUser();
		cy.visit('/');
		cy.get('#get-started-btn').click();
		cy.location('pathname').should('include', 'login');

		cy.get('#lg-register-button').click();
		cy.location('pathname').should('include', 'registration');
		cy.get('#rg-register-button').should('have.css', 'background-color', 'rgb(238, 224, 96)');

		cy.get('#rg-email').type(Cypress.env('TEST_EMAIL'));
		cy.get('#rg-password').type(user.password);
		cy.get('#rg-confirm-password').type(user.password);
		cy.get('#rg-submit-register-button').click();

		cy.get('.rg-error-message').should('exist');
		cy.get('.rg-error-message').should('have.text', 'Email already in use');
		cy.location('pathname').should('include', 'registration');
	})
  
   
  })