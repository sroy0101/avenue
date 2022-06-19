
import 'cypress-file-upload';

describe('Test product manager UI', () => {
  // This
  it('opens the login modal', () => {
    cy.visit('http://localhost:3000')
    cy.get('.modal-dialog button').contains('Login').should('be.visible')
    cy.get('.modal-dialog label').contains('Username').should('be.visible')
  })

  it('allows the product manager to login', () => {
    // cy.visit('http://localhost:3000')
    const username = Cypress.config('testUserName')
    const password = Cypress.config('testuserPassword')
    cy.get('.modal-dialog #username').type(username).should('have.value', username)
    cy.get('.modal-dialog #password').type(password).should('have.value', password)
    cy.get('.modal-dialog  .btn.btn-success').contains('Login').click({force:true})
  })

  it('allows the product manager to add a product', () => {
    cy.get('.container .row .btn.btn-primary').contains('Add Product').should('be.visible')
    cy.get('.container .row .btn.btn-primary').click({force: true})
    .then(() => {
      cy.get('.modal-content .modal-header .modal-title').contains('Product').should('be.visible')

      cy.get('.modal-body label').eq(0).contains('SKU').should('be.visible')
      cy.get('.modal-body #product-sku').type('XYZ-1234567A').should('have.value', 'XYZ-1234567A')

      cy.get('.modal-body label').eq(1).contains('Price').should('be.visible')
      cy.get('.modal-body #product-price').type('12300.45').should('have.value', '012300.45')

      cy.get('.modal-body label').eq(2).contains('Name').should('be.visible')
      cy.get('.modal-body #product-name').type('Camaro').should('have.value', 'Camaro')

      cy.get('.modal-body label').eq(3).contains('Description').should('be.visible')
      cy.get('.modal-body #product-description').type('Blue Chevy Camaro').should('have.value', 'Blue Chevy Camaro')

      cy.get('.modal-body label').eq(4).contains('Active').should('be.visible')
      cy.get('.modal-body .form-check-label input').click()

      cy.get('.modal-body label').eq(5).contains('Shipment Time').should('be.visible')
      cy.get('.modal-body #product-shipment-time').type('2-3 Days').should('have.value', '2-3 Days')

      cy.get('.modal-body label').eq(6).contains('Inventory').should('be.visible')
      cy.get('.modal-body #product-inventory').type('100').should('have.value', '100')

      cy.get('.modal-body #product-gender').select('F')
      cy.get('.modal-body #product-gender').should('have.value', 'F')

      cy.get('.modal-footer .btn.btn-success').contains('Save').click({force:true})
    })

  })

  it('allows the product manager to upload an image for the product just added', () => {
    cy.get('.container .row .list-group-item').last().find('.btn.btn-success').contains('Add Image').should('be.visible')
    cy.get('.container .row .list-group-item').last().find('.btn.btn-success').click({force: true})
    cy.wait(1000)

    cy.get('.modal-dialog .modal-header').contains('Product Image').should('be.visible')
    cy.get('.modal-dialog .modal-body .form-group').first().find('label').contains('Name').should('be.visible')
    cy.get('.modal-dialog .modal-body .form-group').first().find('input').type('image-x').should('have.value', 'image-x')

    cy.get('.modal-dialog .modal-body .form-group').last().find('label').contains('Image').should('be.visible')
    cy.get('.modal-dialog .modal-body .form-group').last().find('input[type=file]').attachFile('camaro.png')
    cy.wait(1000)
    cy.get('.modal-dialog .modal-footer .btn.btn-success').contains('Save').should('be.visible')
    cy.get('.modal-dialog .modal-footer .btn.btn-success').contains('Save').click({force: true})
    // Add this delay to allow the new product list to be displayed.
    cy.wait(2000)

  })

  it('allows the product manager to delete the image just added', () => {
    cy.get('.container .row .list-group-item').last().find('.btn.btn-danger').first().contains('Delete').should('be.visible')
    cy.get('.container .row .list-group-item').last().find('.productImagePreview .btn.btn-danger').first().contains('Delete').click({force:true})

    // Add this delay to allow the new product list to be displayed.
    cy.wait(2000)
  })

  it('allows the product manager to delete the product just added', () => {
    cy.get('.container .row .list-group-item').last().find('.btn.btn-danger').contains('Delete').should('be.visible')
    cy.get('.container .row .list-group-item').last().find('.btn.btn-danger').contains('Delete').click({force:true})

    // Add this delay to allow the new product list to be displayed.
    cy.wait(2000)
  })

})