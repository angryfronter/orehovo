describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("displays the header", () => {
    cy.get("h1").should("contain", "Автосалон ДЦ Орехово")
  })

  it("displays popular car models", () => {
    cy.get("#featured-cars").should("be.visible")
    cy.get("#featured-cars").next().find("a").should("have.length.at.least", 1)
  })

  it("displays current promotions", () => {
    cy.get("#current-promotions").should("be.visible")
    cy.get("#current-promotions").next().find("div").should("have.length.at.least", 1)
  })

  it("allows navigation to car details", () => {
    cy.get("#featured-cars").next().find("a").first().click()
    cy.url().should("include", "/cars/")
  })
})

