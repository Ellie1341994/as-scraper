const EXIT_ROWS = [50,31,21]
const FIRST_SEAT_NUMBER = Cypress.env('first_seat') || 21;
const SECOND_SEAT_NUMBER = Cypress.env('second_seat') || 21;
const PAGE = Cypress.env('page')
describe('Travel seat selection with screenshot test', () => {
  let exitRowsWithItsCriteriaAccepted = []
  let generateSeatSelectionFunction = (seat, visitPage = false) => () => {
    visitPage && cy.visit(PAGE)
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
  }
  it('Selects the first seat', generateSeatSelectionFunction(FIRST_SEAT_NUMBER, true))
  it('Moves to the next seat selection', () => {
    cy.contains("Next flight").click()
  })
  it('Selects the second seat', generateSeatSelectionFunction(SECOND_SEAT_NUMBER))
  it('Confirms selections and takes a screenshot', () => {
    cy.contains("Confirm Selection").click()
      .then( () => {
            cy.wait(3000)
            cy.get(`section`).last().screenshot('Seat Selection')
      }
    )
  })
})
