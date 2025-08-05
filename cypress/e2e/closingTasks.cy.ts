describe('Closing tasks checklist', () => {
  it('allows validating a task', () => {
    cy.intercept('GET', '/api/closing/tasks*', {
      statusCode: 200,
      body: [
        {
          id: 'bank',
          title: 'Rapprochement bancaire',
          description: 'Le rapprochement bancaire a été effectué.',
          status: 'pending'
        }
      ]
    }).as('tasks');

    cy.visit('/closing/monthly');
    cy.wait('@tasks');
    cy.contains('Rapprochement bancaire').should('be.visible');
    cy.contains('Valider').click();
    cy.contains('Complété').should('be.visible');
  });
});

