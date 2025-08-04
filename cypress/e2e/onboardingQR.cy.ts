describe('Onboarding QR', () => {
  it('displays QR code and allows regeneration', () => {
    cy.visit('/onboarding/start');
    cy.get('img[alt="QR Code"]').should('be.visible');
    cy.contains('Ce QR code expire').should('be.visible');
    cy.contains('Régénérer').should('not.exist');
    cy.clock();
    cy.tick(10 * 60 * 1000);
    cy.contains('QR code expiré').should('be.visible');
    cy.contains('Régénérer').click();
    cy.get('img[alt="QR Code"]').should('be.visible');
  });
});
