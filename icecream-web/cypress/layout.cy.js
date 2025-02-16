import Layout from '../app/layout';

describe('<Layout />', () => {
  it('renders Header, Footer, and children correctly', () => {
    cy.mount(
        <Layout>
          <div data-testid="child-content">Test Content</div>
        </Layout>
      );

    cy.get('#header-component').should('exist').and('contain', 'Ice Cream Tracker');
    cy.get('#footer-component').should('exist').and('contain', 'Meredith Designs');
    cy.get('[data-testid="child-content"]').should('exist').and('contain', 'Test Content');
    cy.get('.content-container').should('exist');
    cy.get('.children-container').should('exist');
  });
});
