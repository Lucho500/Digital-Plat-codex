describe('Recommendation widget', () => {
  it('fetches modules from API', () => {
    const token = btoa(JSON.stringify({ role: 'user' }));
    cy.request({
      method: 'GET',
      url: '/api/reco/modules?sector=commerce&size=small',
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length(3);
    });
  });
});
