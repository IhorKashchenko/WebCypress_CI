/// <reference types="cypress" />
import { onLoginPage }  from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSFcreationPage } from "../support/page_objects/smartFormsPageCreation"
import { onBatchIndexPage } from "../support/page_objects/batchIndex"


const sizes = ['iphone-x', 'samsung-note9', 'iphone-6']
const urls = ['https://wa19qa40.altec-wa.com/DoclinkWeb/#/login',
              'https://test.altec-cloud.com/DocLinkWeb/#/login']

describe('SMOKE mobile', () => {
      
  sizes.forEach(size => {

    describe('phones', () => {

      urls.forEach(url => {
        it('check menu items', () => {
          cy.viewport(size)
          cy.visit(url)
          if(url == urls[1]){
            onLoginPage.loginCloud('ik', '1234')
          } else {
            onLoginPage.login('ik', '1234')
          }
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
            // .and('contain', 'CC Processing')
            // .and('contain', 'ExpRpt Combine')
            .and('contain', 'Expense Report')
            .and('contain', 'Ihor Document Creation')
            .and('contain', 'Jake\'s Doc Creation')
            // .and('contain', 'XSLT')
          cy.get('.mat-menu-item').contains('Quick Search').click().wait(500)
          onLoginPage.logout_mobile()
        })
    
        it('navigate cross different pages', () => {
          cy.viewport(size)
          cy.visit(url)
          if(url == urls[1]){
            onLoginPage.loginCloud('ik', '1234')
          } else {
            onLoginPage.login('ik', '1234')
          }
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
          cy.contains('Search For Documents').find('.fa-caret-down').click()
          cy.get('.mat-menu-content').find('[routerlink="/workflow"]').click().wait(500)
          cy.get('.nav-item').should('contain', 'Search')
          cy.get('mat-tab-body')
            .should('contain', 'Delegations')
            .and('contain', 'Favorites')
            .and('contain', 'search criteria')
          cy.get('.fa-caret-down').parent().contains('Search').click()
          cy.get('.mat-menu-content').contains('Supervisor').click().wait(500)
          cy.get('.nav-item').should('contain', 'Supervisor')
          cy.get('.mat-tab-list')
            .should('contain', 'CRITERIA')
            .and('contain', 'RESULTS')
            .and('contain', 'VIEW')
          cy.contains('Supervisor').find('.fa-caret-down').click()
          cy.get('.mat-menu-content').contains('Delegate').click().wait(500)
          cy.get('.nav-item').should('contain', 'Delegate')
          cy.get('mat-tab-group')
            .should('contain', 'DELEGATIONS')
            .and('contain', 'DETAILS')
            .and('contain.text', 'Workflow Delegation for: All Workflow Users')
            .and('contain', 'Add')
            .and('contain', 'Requested')
            .and('contain', 'Accepted')
            .and('contain', 'Rejected')
            .and('contain', 'Deactivated')
          cy.get('[id="detailtoolbar_add"]').should('be.visible').and('be.enabled')
          cy.contains('Delegate').find('.fa-caret-down').click()
          cy.get('.mat-menu-content').contains('Version Control').click().wait(500)
          cy.get('.nav-item').should('contain', 'Version Control')
          cy.get('.container-fluid')
            .should('contain', 'CHECK IN')
            .and('contain', 'UNDO CHECK OUT')
            .and('contain', 'ID')
            .and('contain', 'Items per Page')
          onLoginPage.logout_mobile()
        })
      })
    })   
  })
  
  const ipads = 'ipad-mini'

  describe('SMOKE ipad-mini', () => {

    urls.forEach(url => {
      it('check menu items', () => {
        cy.viewport(ipads)
        cy.visit(url)
        if(url == urls[1]){
          onLoginPage.loginCloud('ik', '1234')
        } else {
          onLoginPage.login('ik', '1234')
         }
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
          // .and('contain', 'CC Processing')
          // .and('contain', 'ExpRpt Combine')
          .and('contain', 'Expense Report')
          .and('contain', 'Ihor Document Creation')
          .and('contain', 'Jake\'s Doc Creation')
          // .and('contain', 'XSLT')
        cy.get('.mat-menu-item').contains('Quick Search').click().wait(500)
        onLoginPage.logout_mobile()
      })
  
      it('navigate cross different pages', () => {
        cy.viewport(ipads)
        cy.visit(url)
        if(url == urls[1]){
          onLoginPage.loginCloud('ik', '1234')
        } else {
          onLoginPage.login('ik', '1234')
        }
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
        cy.contains('Search For Documents').find('.fa-caret-down').click()
        cy.get('.mat-menu-content').find('[routerlink="/workflow"]').click().wait(500)
        cy.get('.nav-item').should('contain', 'Search')
        cy.get('mat-tab-body')
          .should('contain', 'Delegations')
          .and('contain', 'Favorites')
          .and('contain', 'search criteria')
        cy.get('.fa-caret-down').parent().contains('Search').click()
        cy.get('.mat-menu-content').contains('Supervisor').click().wait(500)
        cy.get('.nav-item').should('contain', 'Supervisor')
        cy.get('.mat-tab-list')
          .should('contain', 'CRITERIA')
          .and('contain', 'RESULTS')
          .and('contain', 'VIEW')
        cy.contains('Supervisor').find('.fa-caret-down').click()
        cy.get('.mat-menu-content').contains('Delegate').click().wait(500)
        cy.get('.nav-item').should('contain', 'Delegate')
        cy.get('mat-tab-group')
          .should('contain', 'DELEGATIONS')
          .and('contain', 'DETAILS')
          .and('contain.text', 'Workflow Delegation for: All Workflow Users')
          .and('contain', 'Add')
          .and('contain', 'Requested')
          .and('contain', 'Accepted')
          .and('contain', 'Rejected')
          .and('contain', 'Deactivated')
        cy.get('[id="detailtoolbar_add"]').should('be.visible').and('be.enabled')
        cy.contains('Delegate').find('.fa-caret-down').click()
        cy.get('.mat-menu-content').contains('Version Control').click().wait(500)
        cy.get('.nav-item').should('contain', 'Version Control')
        cy.get('.container-fluid')
          .should('contain', 'CHECK IN')
          .and('contain', 'UNDO CHECK OUT')
          .and('contain', 'ID')
          .and('contain', 'Items per Page')
        onLoginPage.logout_mobile()
      })
    })
  })
})



