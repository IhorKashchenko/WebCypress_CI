/// <reference types="cypress" />
import { onLoginPage }  from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSFcreationPage } from "../support/page_objects/smartFormsPageCreation"
import { onBatchIndexPage } from "../support/page_objects/batchIndex"


const sizes = ['iphone-x', 'samsung-note9', 'iphone-6']

describe('SMOKE mobile', () => {
      
  sizes.forEach(size => {
      // cy.openCloudLoginPage()
      // onLoginPage.loginCloud('ik', '1234')
    it('check menu items', () => {
      cy.viewport(size)
      cy.openLoginPage()
      onLoginPage.login('ik', '1234')
      cy.contains('Quick Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').should('contain', 'Quick Search')
        .and('contain', 'Advanced Search')
        .and('contain', 'Full Text Search')
        .and('contain', 'View Documents by ID')
        .and('contain', 'Search')
        .and('contain', 'Supervisor')
        .and('contain', 'Delegate')
        .and('contain', 'Tools')
        .and('contain', 'Version Control')
        .and('contain', 'Smart Forms')
        .and('contain', 'CC Processing')
        .and('contain', 'ExpRpt Combine')
        .and('contain', 'Expense Report')
        .and('contain', 'Ihor Document Creation')
        .and('contain', 'Jake\'s Doc Creation')
        .and('contain', 'XSLT')
      cy.get('.mat-menu-item').contains('Quick Search').click().wait(500)
      onLoginPage.logout_mobile()
  })

    it('navigate cross different pages', () => {
      cy.viewport(size)
      cy.openLoginPage()
      onLoginPage.login('ik', '1234')
      cy.contains('Quick Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').contains('Advanced Search').click().wait(500)
      cy.get('.nav-item').should('contain', 'Advanced Search')
      cy.get('[id="advancedSearch-detail-content"]')
        .should('contain', 'companies')
        .and('contain', 'document types')
        .and('contain', 'properties')
      cy.contains('Advanced Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').contains('Full Text Search').click().wait(500)
      cy.get('.nav-item').should('contain', 'Full Text Search')
      cy.get('[id="searchOptions"]').should('be.visible')
      cy.contains('Full Text Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').contains('View Documents by ID').click().wait(500)
      cy.get('[id="searchByIdForm"]').find('input').type(31036)
      cy.get('.mat-dialog-actions').find('[type="submit"]').click()
      cy.get('.nav-item').should('contain', 'Search For Documents')
      cy.get('[id="resultstoolbar_open"]').should('be.visible').and('be.disabled')
      onLoginPage.logout_mobile()
    })
  })
})


describe('SMOKE ipad-mini', () => {

  beforeEach('open application', () => {
      cy.viewport('ipad-mini')
      cy.openLoginPage()
      // cy.openCloudLoginPage()
      onLoginPage.login('ik', '1234')
      // onLoginPage.loginCloud('ik', '1234')
  })

  it('check menu items', () => {
      cy.contains('Quick Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').should('contain', 'Quick Search')
        .and('contain', 'Advanced Search')
        .and('contain', 'Full Text Search')
        .and('contain', 'View Documents by ID')
        .and('contain', 'Search')
        .and('contain', 'Supervisor')
        .and('contain', 'Delegate')
        .and('contain', 'Tools')
        .and('contain', 'Version Control')
        .and('contain', 'Smart Forms')
        .and('contain', 'CC Processing')
        .and('contain', 'ExpRpt Combine')
        .and('contain', 'Expense Report')
        .and('contain', 'Ihor Document Creation')
        .and('contain', 'Jake\'s Doc Creation')
        .and('contain', 'XSLT')
      cy.get('.mat-menu-item').contains('Quick Search').click().wait(500)
      onLoginPage.logout_mobile()
  })

  it('navigate cross different pages', () => {
      cy.contains('Quick Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').contains('Advanced Search').click().wait(500)
      cy.get('.nav-item').should('contain', 'Advanced Search')
      cy.get('[id="sidebar-header"]')
        .should('contain', 'Saved Searches')
      cy.contains('Advanced Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').contains('Full Text Search').click().wait(500)
      cy.get('.nav-item').should('contain', 'Full Text Search')
      cy.get('[id="searchOptions"]').should('be.visible')
      cy.contains('Full Text Search').find('.fa-caret-down').click()
      cy.get('.mat-menu-content').contains('View Documents by ID').click().wait(500)
      cy.get('[id="searchByIdForm"]').find('input').type(31036)
      cy.get('.mat-dialog-actions').find('[type="submit"]').click()
      cy.get('.nav-item').should('contain', 'Search For Documents')
      cy.get('[id="resultstoolbar_open"]').should('be.visible').and('be.disabled')
      onLoginPage.logout_mobile()
  })

})
