describe('QR KPI dashboard', () => {
  it('shows metrics for admin', () => {
    cy.intercept('POST', '**/rest/v1/rpc/get_qr_kpi', {
      statusCode: 200,
      body: [{ ttfv_ms: 1000, ttfv_sparkline: [1000, 2000], drop_off: 0.05, adoption_qr: 30, adoption_classic: 70, parsing_success: 0.9 }]
    }).as('kpi');

    cy.visit('/admin/kpi-qr', {
      onBeforeLoad(win) {
        win.localStorage.setItem('sb-localhost-auth-token', JSON.stringify({
          currentSession: {
            access_token: 'token',
            refresh_token: 'refresh',
            user: { id: '1', user_metadata: { role: 'admin' } }
          },
          expiresAt: Math.floor(Date.now() / 1000) + 3600
        }));
      }
    });

    cy.wait('@kpi');
    cy.contains('TTFV').should('be.visible');
    cy.contains('Drop-off').should('be.visible');
    cy.contains('Adoption').should('be.visible');
    cy.contains('Parsing success').should('be.visible');
  });
});
