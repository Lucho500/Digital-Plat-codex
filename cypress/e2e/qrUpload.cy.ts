describe('QR Upload', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/ocr/upload', {
      statusCode: 200,
      body: { ok: true }
    }).as('upload');
  });

  it('uploads a file successfully', () => {
    cy.visit('/qr-upload/token123');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sample.pdf', {
      force: true
    });
    cy.contains('Envoyer').click();
    cy.wait('@upload').its('response.statusCode').should('eq', 200);
  });

  it('shows error for large file', () => {
    cy.visit('/qr-upload/token123');
    const big = {
      contents: new Uint8Array(11 * 1024 * 1024),
      fileName: 'big.pdf',
      mimeType: 'application/pdf'
    };
    cy.get('input[type="file"]').selectFile(big, { force: true });
    cy.contains('Taille max 10 MB').should('be.visible');
  });

  it('handles expired token', () => {
    cy.visit('/qr-upload/expired');
    cy.contains('QR expiré').should('be.visible');
  });
});
