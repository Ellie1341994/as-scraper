const EXIT_ROWS = [50,31,21]
const FIRST_SEAT_NUMBER = Cypress.env('first_seat') || 21;
const SECOND_SEAT_NUMBER = Cypress.env('second_seat') || 21;
const PAGE = Cypress.env('page')
describe('Travel seat selection with screenshot test', () => {
  let exitRowsWithItsCriteriaAccepted = []
  let generateSeatSelectionFunction = (seat, visitPage = false) => () => {
    visitPage && cy.visit(PAGE)
    console.log(PAGE)
    cy.get(`[aria-label*="Seat: ${seat}"]`)
      .then(seats =>
        {
          const RANDOM_INDEX = Math.floor(Math.random() * seats.length);
          seats[RANDOM_INDEX].click()
          if(EXIT_ROWS.includes(seat) && !exitRowsWithItsCriteriaAccepted.includes(seat)){
            cy.contains('Yes, I accept').click()
            exitRowsWithItsCriteriaAccepted.push(seat)
          }
          cy.contains('Select').click()
        }
      )
    cy.get(`[aria-label*="Seat Selection"]`).screenshot()
  }
  it('Selects the first seat and takes a screenshot', generateSeatSelectionFunction(FIRST_SEAT_NUMBER, true))
 it('Flips travel destination', () => {
   cy.get(`[id="itinerary-select-select"]`).select("JFK → PRN")
 })
 it('Selects the second seat and takes a screenshot', generateSeatSelectionFunction(SECOND_SEAT_NUMBER))
})
