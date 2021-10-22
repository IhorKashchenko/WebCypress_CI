/// <reference types="cypress" />

import { onLoginPage }  from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onBatchIndexPage } from "../support/page_objects/batchIndex"

describe('Test with Page Objects', () => {

    beforeEach('open application', () => {
        cy.openLoginPage()
        onLoginPage.login('ik', '1234')
    })

    // afterEach('logOut', () => {
    //     onLoginPage.logout()
    // })

    it.only('creatingAccumatica', () => {

        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('AP Accumatica')
        onBatchIndexPage.saveButtonClick()
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.smartFormMenuVerefication()
        cy.expandButtonClick()
        cy.createButtonClick()
        cy.templateButtonClick()
        cy.contains('AcumaticaAuto').click({force:true})
        cy.wait(500)
        cy.stampButtonClick()
        cy.burnWarningYesButtonClick()
        cy.burnAssertion()
        onLoginPage.logout()
    })

    it('creatingSage300', () => {

        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('AP Sage 300')
        onBatchIndexPage.saveButtonClick()
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.smartFormMenuVerefication()
        cy.expandButtonClick()
        cy.createButtonClick()
        cy.templateButtonClick()
        cy.contains('Sage300Auto').click({force:true})
        cy.wait(500)
        cy.stampButtonClick()
        cy.burnWarningYesButtonClick()
        cy.burnAssertion()
        onLoginPage.logout()
    })

    it('creatingSL', () => {

        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('AP SL')
        onBatchIndexPage.saveButtonClick()
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.smartFormMenuVerefication()
        cy.expandButtonClick()
        cy.createButtonClick()
        cy.templateButtonClick()
        cy.contains('SLAuto').click({force:true})
        cy.wait(500)
        cy.stampButtonClick()
        cy.burnWarningYesButtonClick()
        cy.burnAssertion()
        onLoginPage.logout()
    })

    it('creatingGpBTQ', () => {

        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('AP GP')
        onBatchIndexPage.saveButtonClick()
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.smartFormMenuVerefication()
        cy.expandButtonClick()
        cy.createButtonClick()
        cy.templateButtonClick()
        cy.contains('GP BTQ Auto').click({force:true})
        cy.wait(500)
        cy.stampButtonClick()
        cy.burnWarningYesButtonClick()
        cy.burnAssertion()
        onLoginPage.logout()
    })

    it('creatingExpChg', () => {

        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('Expense')
        onBatchIndexPage.saveButtonClick()
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.smartFormMenuVerefication()
        cy.expandButtonClick()
        cy.startButtonClick()
        cy.appendButtonClick()
        onLoginPage.logout()
    })
    
})