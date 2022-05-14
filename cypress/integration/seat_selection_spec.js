describe('My First Test', () => {
  it('Selects the first seat and takes a screenshot of the selection element', () => {
    cy.visit("https://static.gordiansoftware.com/")
    cy.get(`[aria-label*="Seat: ${Cypress.env('first_seat') || 22}"]`)
      .then(seats =>
        {
          const FIRST_SEAT_INDEX = Math.floor(Math.random() * seats.length);
          seats[FIRST_SEAT_INDEX].click()
          cy.contains('Select').click()
        }
      )
    cy.get(`[aria-label*="Seat Selection"]`).screenshot()
  })
  it('Changes travel destination for the second seat selection', () => {
    cy.get(`[id="itinerary-select-select"]`).select("JFK → PRN")
  })
  it('Selects the second seat and takes a screenshot of the selection element', () => {
    cy.get(`[aria-label*="Seat: ${Cypress.env('second_seat') || 50}"]`)
      .then(seats =>
        {
          const SECOND_SEAT_INDEX = Math.floor(Math.random() * seats.length);
          seats[SECOND_SEAT_INDEX].click()
          cy.contains('Select').click()
        }
      )
    cy.get(`[aria-label*="Seat Selection"]`).screenshot()
  })
})
