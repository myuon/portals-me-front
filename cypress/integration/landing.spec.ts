describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show the service name", () => {
    cy.get("#the-topbar").then($elem => {
      expect($elem.text()).to.contain("Portals@me");
    });
  });
});
