// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const { ElementFinder } = require("protractor")

/*********************************************************************************************
 COMPANIES  
  Altec , AltecMPP-DEV , American Business Expressions , Contoso Entertainment System USA 
  Contoso, Ltd:Demo ,  DELL ,  EDM Inc. ,  EDM Systems ,  Fabrikam, Inc. 
  MédiaQM ,  Microsoft ,  Moving Technology Inc ,  NA10 ,  NA20 ,  SalesDemo 
  SAMINC ,  Systems of America ,  傑克的公司 和美國的系統 
***********************************************************************************************/

/***************************************************************
 SMART FORM Workflow/Companies:
 Acumatica - AP Acumatica (Accumatica Bill)
 ExpChg - Expense (Expense Receipt)
 Distribution Stamp - eSign (Jake's Invoice 3)
 GP BTQ - AP GP (Vendor Invoice GP)
 SL - AP SL (Vendor Invoice SL)
 Sage 300 - AP Sage 300 (Vendor Invoice Sage 300)
 */

Cypress.Commands.add('openLoginPage', () => {
    cy.visit('/')
})

Cypress.Commands.add('openCloudLoginPage', () => {
    cy.visit('https://east-test.altec-cloud.com/DocLinkWeb/#/login')
})

// Assertion

Cypress.Commands.add('ReturnToResultsBtnClick', () => {
    cy.contains(' Return to Results ').click()
    cy.wait(500)
})

Cypress.Commands.add('smartFormMenuVerefication', () => {
    cy.wait(2500)
    cy.get('.SmartFormViewerTab').should('contain', 'Menu')
})

//******************** Smart Forms Common buttons HERE*****************

Cypress.Commands.add('startButtonClick', () => {
    cy.contains(' Start ').click()
    cy.wait(1000)
})

Cypress.Commands.add('saveButtonClick', () => {
    cy.contains(' Save ').click()
    cy.wait(1000)
})

Cypress.Commands.add('appendButtonClick', () => {
    cy.contains(' Append ').click()
    cy.wait(1000)
})

Cypress.Commands.add('stampButtonClick', () => {
    cy.contains(' Stamp ').click()
    cy.wait(3000)
})

Cypress.Commands.add('cancelButtonClick', () => {
    cy.contains(' Cancel ').click()
    cy.wait(1000)
})

Cypress.Commands.add('attachmentsButtonClick', () => {
    cy.contains('Attachments').click()
    cy.wait(1000)
})

Cypress.Commands.add('refreshButtonClick', () => {
    cy.contains('Refresh').click()
    cy.wait(1000)
})

Cypress.Commands.add('templateButtonClick', () => {
    cy.contains('Template').click()
    cy.wait(1000)
})

Cypress.Commands.add('burnWarningYesButtonClick', () => {
    cy.get('mat-dialog-actions').find('button').eq(0).click({force:true})
    cy.wait(1000)
})

Cypress.Commands.add('burnAssertion', () => {
    cy.get('.toast-container').should('contain', 'Burned') 
})

Cypress.Commands.add('companyDropdownClick', (company) => {
    cy.get('mat-form-field').eq(0).click()  // company dropdown
    cy.wait(1000)
    cy.get('.mat-select-panel').contains(company).click({force:true})
})

Cypress.Commands.add('addButtonClick', () => {
    cy.contains('Add ').click()
    cy.wait(1000)
})

Cypress.Commands.add('removeButtonClick', () => {
    cy.contains('Remove ').click()
})

Cypress.Commands.add('createButtonClick', () => {
    cy.contains(' Create ').click()
    cy.wait(1000)
})

Cypress.Commands.add('expandButtonClick', () => {
    cy.get('as-split-area').find('.fa-expand-alt').click()
    cy.wait(500)
})

Cypress.Commands.add('addingPropertyValue', (prop, value) => {
    cy.contains(prop)
    .parent()
    .parent()
    .click()
    .wait(1000)
    .type(value)
})

// Select Smart Form Dropdown button in the Viewer
Cypress.Commands.add('openSmartFormList', () => {
    cy.get('mat-toolbar').find('button').eq(1).click()
    cy.wait(500)
})

// Hide Smart Form Button
Cypress.Commands.add('hideSmartForm', () => {
    cy.get('.cdk-overlay-pane').contains(' Hide Smart Forms ').click({force:true})
    cy.wait(500)
})

// Select Smart Form depends on Doc Type
Cypress.Commands.add('selectSmartForm', () => {
    cy.get('[id="property-panel"]').find('caption')
    .find('span').eq(0)
    .invoke('text').then( docPropertyName =>{
        if(docPropertyName == 'Acumatica Bill:'){
            cy.openSmartFormList()
            cy.get('.cdk-overlay-pane').contains('Acumatica').click({force:true})        
        }
        else if(docPropertyName == 'Vendor Invoice D365:'){
            cy.openSmartFormList()
            cy.get('.cdk-overlay-pane').contains('D365').click({force:true})        
        }
        // else if(docPropertyName == 'Jake`s Invoice 3:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains(' Distribution Stamp ').click({force:true})        
        // }
        else if(docPropertyName == 'Expense Receipt:'){
            cy.openSmartFormList()
            cy.get('.cdk-overlay-pane').contains('ExpChg').click({force:true})        
        }
        // else if(docPropertyName == 'GP AA :'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('GP AA').click({force:true})        
        // }
        else if(docPropertyName == 'Vendor Invoice GP:'){
            cy.openSmartFormList()
            cy.get('.cdk-overlay-pane').contains('GP BTQ').click({force:true})        
        }
        // else if(docPropertyName == 'Vendor Invoice GP:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('GP WebSvc').click({force:true})        
        // }
        // else if(docPropertyName == 'IHOR PAGE CREATION:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('IHOR PAGE CREATION').click({force:true})        
        // }
        // else if(docPropertyName == 'IHOR Sage300_Copy:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('IHOR Sage300_Copy').click({force:true})        
        // }
        // else if(docPropertyName == 'Intacct:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('Intacct').click({force:true})        
        // }
        else if(docPropertyName == 'Vendor Invoice SL:'){
            cy.openSmartFormList()
            cy.get('.cdk-overlay-pane').contains('SL').click({force:true})        
        }
        // else if(docPropertyName == 'Sage 100:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('Sage 100').click({force:true})        
        // }
        else if(docPropertyName == 'Vendor Invoice Sage 300:'){
            cy.openSmartFormList()
            cy.get('.cdk-overlay-pane').contains('Sage 300').click({force:true})        
        }
        // else if(docPropertyName == 'SupCh:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('SupCh').click({force:true})        
        // }
        // else if(docPropertyName == 'X3:'){
        //     cy.openSmartFormList()
        //     cy.get('.cdk-overlay-pane').contains('X3').click({force:true})        
        // }
        
    })
})

//********************* */ Batch Index Common HERE*************

Cypress.Commands.add('openBatchIfLocked', () => {
    cy.get('.table-responsive').then( table => {
        if(table.find('.fa-lock').length > 0) {
            cy.get('table').contains('Unlock Batch').click()
            cy.wait(1000)
            cy.get('.fa-folder-open').click()
        } else {
            cy.get('.fa-folder-open').click() 
        }
    })
})

Cypress.Commands.add('workflowDocTypeSelect', (wfName) => {
    cy.get('[class="row"]').find('.col').eq(0).click()
    cy.contains(wfName).click()
    cy.wait(1000)
})


// Serach Fields
// By ID

Cypress.Commands.add('navigateToSearchByID', () => {
    cy.get('mat-toolbar-row').eq(0).find('li a').eq(0).click({force:true})
    cy.wait(500)
    cy.contains('View Documents by ID').click({force:true})
    cy.wait(500)
})
// RESULTS Grid
Cypress.Commands.add('openFirstDocument', () => {
    cy.get('tbody tr').find('td').first().click()
    cy.wait(500)
    cy.get('.toolbar').find('[id="resultstoolbar_open"]').click()
    cy.wait(4000)
})

//Random
Cypress.Commands.add('menuBtnClick', () => {
    cy.get('mat-toolbar-row ul').eq(2).click()
})

Cypress.Commands.add('MySettingsBtnClick', () => {
    cy.get('.mat-menu-content').contains('button', 'My Settings').click({force: true})
})

Cypress.Commands.add('EnglishLanguageSelect', () => {
    cy.get('[id="language-and-culture"]').find('.culture-button').first().click()
})

Cypress.Commands.add('RotateLeftClick', () => {
    cy.get('[id="document-image-container"]').find('[id="imageviewer-more-items"]').click()
    cy.contains(' Rotate Left ').click()
})

Cypress.Commands.add('RotateRightClick', () => {
    cy.get('[id="document-image-container"]').find('[id="imageviewer-more-items"]').click()
    cy.contains(' Rotate Right ').click()
})

Cypress.Commands.add('customizeCurrentViewClick', () => {
    cy.get('[id="resultstoolbar_customizeview"]').click()
})

Cypress.Commands.add('selectWFANDStatus', (wf, status) => {
    cy.get('[id="workflowsearchlist"]').contains('Workflow').click({force:true})
    cy.get('[class="cdk-overlay-pane"]').contains(wf).click()
    cy.get('[id="workflowsearchlist"]').contains('Status').click({force:true})
    cy.get('[class="cdk-overlay-pane"]').contains(status).click()
})
