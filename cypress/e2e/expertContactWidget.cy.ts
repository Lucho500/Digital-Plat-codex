describe('ExpertContactWidget', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/experts/*', {
      body: {
        id: 'exp1',
        name: 'Julie Bernard',
        speciality: 'Fiscalité PME',
        avatarUrl: 'https://placekitten.com/200/200',
        online: true,
        npsScore: 90
      }
    });
    cy.intercept('GET', '**/rest/v1/feature_flags*', {
      body: [{ is_enabled: true }]
    });
  });

  it('desktop: widget visible and plan call opens modal', () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.contains('Planifier un appel').click();
    cy.contains('Fonctionnalité à venir').should('be.visible');
  });

  it('mobile: widget full width and links work', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.contains('Envoyer un message').click();
    cy.url().should('include', '/messages/new?to=exp1');
  });
});
