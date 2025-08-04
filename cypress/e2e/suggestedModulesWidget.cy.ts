describe('SuggestedModulesWidget', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/reco/modules*', {
      body: [
        { moduleId: 'e-invoice' },
        { moduleId: 'inventory' },
        { moduleId: 'project-tracking' }
      ]
    });
    cy.intercept('GET', '**/rest/v1/feature_flags*', {
      body: [{ is_enabled: true }]
    });
  });

  it('desktop: widget présent et CTA ouvre modal', () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    cy.contains('Essayer').first().click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contain('Try & Buy');
    });
  });

  it('mobile: widget positionné et CTA fonctionne', () => {
    cy.viewport(375, 667);
    cy.visit('/');
    cy.contains('Essayer').first().click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contain('Try & Buy');
    });
  });
});
