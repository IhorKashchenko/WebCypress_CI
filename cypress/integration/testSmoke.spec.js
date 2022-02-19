/// <reference types="cypress" />

import { onLoginPage }  from "../support/page_objects/loginPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSFcreationPage } from "../support/page_objects/smartFormsPageCreation"
import { onBatchIndexPage } from "../support/page_objects/batchIndex"


describe('Login Pege Layout', () => {

    it('Login Pege Layout', () => {
        cy.openLoginPage()
        cy.get('[id="profileButton"]').should('contain.text', 'use a saved profile').and('be.enabled')
        cy.contains('Enter your credentials:').should('contain.text', 'Enter your credentials:')
        cy.get('[name="WindowsAuth"]').should('contain.text', 'Use Windows Authentication').and('not.be.checked')
        cy.contains('Azure AD').should('not.be.selected')
        cy.get('[name="RememberMe"]').should('contain.text', 'Save Profile As').and('not.be.checked')
        cy.get('[name="ProfileName"]').should('be.visible').and('be.disabled')
        cy.contains('Clear').should('be.visible').and('be.enabled')
        cy.get('[type="submit"]').contains('Login').should('be.visible').and('not.be.enabled')
        cy.get('[type="submit"]').screenshot('first').then(fs => {
            cy.get('form').contains('mat-form-field', 'Login').type('username')
            cy.get('form').contains('mat-form-field', 'Password').type('password')
            cy.get('[type="submit"]').screenshot('second').then(sec => {
                if(fs != sec){
                    cy.get('[type="submit"]').click()
                }
            })
        })
    })
})

describe('Smoke Test', () => {

    beforeEach('open application', () => {
      cy.openLoginPage()
      // cy.openCloudLoginPage()
      if(Cypress.browser.name === 'chrome'){
        onLoginPage.login('ik', '1234')
      }
      if(Cypress.browser.name === 'firefox'){
        onLoginPage.login('ihorKweb4.0', '1234')
      }
      if(Cypress.browser.name === 'edge'){
        onLoginPage.login('ik3', '1234')
      }
    })

    it('verify navigation across the pages', () => {
        navigateTo.quickSearchPage()
        navigateTo.advancedSearchPage()
        navigateTo.fullTextSearchPage()
        // navigateTo.viewByIdSearchPage()
        navigateTo.workflowSearchPage()
        navigateTo.workflowSupervisorPage()
        navigateTo.workflowDelegatePage()    
        navigateTo.batchIndexPage()
        navigateTo.versionControlPage()
        // navigateTo.smartFormsPage()
        onLoginPage.logout()
    })

    it('creating IhorDoc Creation SF', () => {
        navigateTo.smartFormsPage()
        onSFcreationPage.selectIhorDocumentCreation()
        cy.get('[id="toolbar-button-container"]')
        .should('contain', ' Start ')
        .and('contain', ' Template ')
        .and('contain', ' Cancel ')
        .and('contain', ' Create ')
        .and('contain', ' Export ')
        .and('contain', ' Attachments ')
        .and('contain', ' Delete Template ')
        .and('contain', ' Save as Template ')
        cy.contains('Add').should('be.visible').and('be.disabled')
        cy.contains('Remove').should('be.visible').and('be.disabled')
        cy.startButtonClick()
        cy.contains('Add').should('be.visible').and('not.be.disabled')
        cy.contains('Remove').should('be.visible').and('be.disabled')
        cy.companyDropdownClick('EDM Inc.')
        cy.addButtonClick()
        cy.addingPropertyValue('Currency', 'usd')
        cy.addingPropertyValue('PO Amount', '165.25')
        cy.addingPropertyValue('User Name', 'Ihor')
        cy.createButtonClick()
        cy.get('[id="toast-container"]').should('be.visible') //Document Created message
        cy.contains('Open New Document').should('be.visible')
        onLoginPage.logout()
        
    })

    it('creating CC Processing Creation SF', () => {
        navigateTo.smartFormsPage()
        onSFcreationPage.selectCCProcesingDC()
        cy.startButtonClick()
        cy.createButtonClick()
        cy.get('[id="toast-container"]').should('be.visible')
        cy.contains('Open New Document').click()
        cy.ReturnToResultsBtnClick()
        onLoginPage.logout()
        
    })

    it('indexNewDocument', () => {
        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('AP Sage 300')    
        onBatchIndexPage.saveButtonClick()
        //Copy document
        cy.get('[id="batchindex-copy-selected"]').click({force:true})
        cy.get('.mat-dialog-container').find('input').clear({force:true}).type(15)
        cy.get('button').contains('Ok').click({force:true})
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        onLoginPage.logout()

    })

    it('indexNewDocumentSL', () => {
        navigateTo.batchIndexPage()
        onBatchIndexPage.openTiffFolder()
        onBatchIndexPage.sendToWorkflowEnableClick()
        cy.workflowDocTypeSelect('SL')
        onBatchIndexPage.saveButtonClick()
        onBatchIndexPage.searchNewCreatedDoc()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.smartFormMenuVerefication()
        onLoginPage.logout()

    })

    it('openFirstDoc', ()=> {
        cy.navigateToSearchByID()
        cy.get('[id="searchByIdForm"]').find('input').type(31036)
        cy.get('[type="submit"]').click()
        cy.openFirstDocument()
        cy.selectSmartForm()
        cy.expandButtonClick()
        cy.createButtonClick()
        cy.templateButtonClick()
        cy.contains('AcumaticaAuto').click({force:true})
        cy.stampButtonClick()
        cy.get('mat-dialog-actions').find('button').eq(0).click({force:true})
        cy.get('.toast-container').should('contain', 'Burned')
        onLoginPage.logout()           
        
    })

    it('LanguageChangeToFrench', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains('French').click()
        cy.contains(' Sauvegarder ').click()
        cy.menuBtnClick()
        cy.get('.mat-menu-content').should('contain' , 'Mes paramètres')
        cy.get('.mat-menu-content').contains('button', 'Mes paramètres').click({force: true})
        cy.EnglishLanguageSelect()
        cy.contains(' Save ').click()
        onLoginPage.logout()

    })

    it('LanguageChangeToSpanish', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains('Spanish').click()
        cy.contains(' Guardar ').click()
        cy.menuBtnClick()
        cy.get('.mat-menu-content').should('contain' , 'Mi Configuración')
        cy.get('.mat-menu-content').contains('button', 'Mi Configuración').click({force: true})
        cy.EnglishLanguageSelect()
        cy.contains(' Save ').click()
        onLoginPage.logout()

    })

    it('LanguageChangeToBritish', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains('(British)').click()
        cy.contains('Save').click()
        cy.menuBtnClick()
        cy.get('.mat-menu-content').should('contain' , 'My Settings')
        cy.MySettingsBtnClick()
        cy.EnglishLanguageSelect()
        cy.contains(' Save ').click()
        onLoginPage.logout()
    })

    it('viewList', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains(' List ').click()
        cy.contains(' Save ').click()
        cy.navigateToSearchByID()
        cy.get('[id="searchByIdForm"]').find('input').type(31036)
        cy.get('[type="submit"]').click()
        cy.contains(' View ').should('contain', ' View ')
        cy.contains(' Actions ').should('contain', ' Actions ')
        onLoginPage.logout()
    })

    it('viewGallery', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains(' Gallery ').click()
        cy.contains(' Save ').click()
        cy.navigateToSearchByID()
        cy.get('[id="searchByIdForm"]').find('input').type(31036)
        cy.get('[type="submit"]').click()
        cy.contains('VIEW').should('contain', 'VIEW')
        cy.contains('ACTIONS').should('contain', 'ACTIONS')
        onLoginPage.logout()
    })

    it('Open document in Workflow Viewer', () => {
        navigateTo.workflowSearchPage()
        cy.selectWFANDStatus('Ihor', 'Auto')
        cy.contains('Search and Open').click().wait(4000)
        cy.get('[id="document-image-container"]').find('.fa-save')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-download')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-download')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-envelope')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-print')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-th')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-search-plus')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-search-minus')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('[id="imageviewer-zoom-menu"]')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-comments')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-stamp')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-sticky-note')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('.fa-info-circle')
        .should('be.visible')
        cy.get('[id="document-image-container"]').find('[id="imageviewer-more-items"]')
        .should('be.visible')
        cy.get('.workflow-toolbar').find('.fa-caret-down')
        .should('be.visible')
        cy.get('.workflow-toolbar').find('.fa-archive')
        .should('be.visible')
        cy.get('.workflow-toolbar').find('.fa-bars')
        .should('be.visible')
        cy.get('[id="documentInfoTabs"]')
        .should('contain', 'General')
        .and('contain', 'Notes')
        onLoginPage.logout()

    })

    it('Check Invert Colors', () => {
        navigateTo.workflowSearchPage()
        cy.selectWFANDStatus('Ihor', 'Auto')
        cy.contains('Search and Open').click().wait(4000)
        cy.get('[id="imageViewPort"]').should('have.attr','class').should('not.contain' ,'viewer-container no-thumbnails inverted')
        cy.get('[id="document-image-container"]').find('[id="imageviewer-more-items"]').click()
        cy.contains(' Invert colors ').click()
        cy.get('[id="imageViewPort"]').should('have.attr','class').should('contain' ,'viewer-container no-thumbnails inverted')
        cy.get('[class="lower-canvas"]').should('have.attr', 'style').should('contain' ,'filter: invert(1)')
        cy.get('[id="documentInfoTabs"]').contains('Notes').click()
        cy.get('.infoNote').first().click()
        cy.get('textarea').click().type('The color is Inverted and Test PASS')
        cy.get('button').contains('Ok').click()
        onLoginPage.logout()
    })

    it('Check Rotation', () => {
        navigateTo.workflowSearchPage()
        cy.selectWFANDStatus('Ihor', 'Auto')
        cy.contains('Search and Open').click().wait(4000)
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(0deg)')
        cy.RotateLeftClick().screenshot('left').as('left')
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(270deg)')
        cy.RotateLeftClick()
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(180deg)')
        cy.RotateLeftClick()
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(90deg)')
        cy.RotateLeftClick().screenshot('basic1').as('basic1')
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(0deg)')
        cy.RotateRightClick().screenshot('right').as('rignt')
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(90deg)')
        cy.RotateRightClick()
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(180deg)')
        cy.RotateRightClick()
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(270deg)')
        cy.RotateRightClick()
        cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(0deg)')
        if("@basic" === '@left' || '@basic' === '@right' || '@left' === '@right') {
          cy.log('FAIL!!!')
          cy.get('[input=testFail]')
        }
        cy.get('[id="documentInfoTabs"]').contains('Notes').click()
        cy.get('.infoNote').first().click()
        cy.get('textarea').click().type('The image is Rotated and Test PASS')
        cy.get('button').contains('Ok').click()
        onLoginPage.logout()

    })

    it('Visible Tabs Should be visible in Viewer', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains('Viewer Settings').click()
        cy.get('[id="visible-tabs"]').find('[type="checkbox"]').check({force:true})
        cy.contains(' Save ').click()
        cy.navigateToSearchByID()
        cy.get('[id="searchByIdForm"]').find('input').type(31036)
        cy.get('[type="submit"]').click()
        cy.openFirstDocument()
        cy.get('[id="documentInfoTabs"]')
          .should('contain', 'General')
          .and('contain', 'Notes')
          .and('contain', 'OM History')
          .and('contain', 'Workflow History')
          .and('contain', 'Annotation Summary')
          .and('contain', 'Audit History')
          .and('contain', 'Index')
        cy.contains('General').click()
        cy.get('[id="document-details-panel"]')
          .should('contain.text', 'Document')
          .and('contain.text', 'Origination')
          .and('contain.text', 'Index Property Values')
        cy.contains('Notes').click()
        cy.get('[id="documentNotes"]')
          .should('contain.text', 'Approve')
          .and('contain.text', 'Deny')
          .and('contain.text', 'Info')
          .and('contain', 'Items per Page')
        cy.contains('OM History').click()
        cy.get('[id="documentOMHist"]')
          .should('contain', 'Date/Time')
          .and('contain', 'Recipient')
          .and('contain', 'Destination')
          .and('contain', 'Batch Status ')
          .and('contain', 'Batch ID')
          .and('contain', 'Items per Page')
        cy.contains('Workflow History').click()
        cy.get('[id="documentWFHist"]')
          .should('contain', 'Date')
          .and('contain', 'Workflow History')
          .and('contain', 'Status')
          .and('contain', 'User')
          .and('contain', 'Items per Page')
        cy.contains('Annotation Summary').click()
        cy.get('[id="documentAnnotationSummary"]')
          .should('contain', 'Created')
          .and('contain', 'User')
          .and('contain', 'Page')
          .and('contain', 'Items per Page')
        cy.contains('Audit History').click()
        cy.get('[id="documentAuditHist"]')
          .should('contain', 'Date/Time')
          .and('contain', 'User')
          .and('contain', 'Action')
          .and('contain', 'Items per Page')
        cy.contains('Index').click()
        cy.get('[id="documentIndex"]')
          .should('contain', 'Document')
          .and('contain', 'Company')
          .and('contain', 'Type')
          .and('contain', 'Properties')
        cy.get('[id="btnClear"]')
          .should('be.enabled')
        cy.get('[id="btnSave"]')
          .should('be.disabled')
        cy.get('[id="btnReset"]')
          .should('be.disabled')
        onLoginPage.logout()

    })

    it('Display Field check', () => {
        cy.menuBtnClick()
        cy.MySettingsBtnClick()
        cy.contains('Search Results').click()
        cy.get('[type="checkbox"]').check({force:true})
          .should('be.checked')
        cy.contains('Save').click()
        cy.navigateToSearchByID()
        cy.get('[id="searchByIdForm"]').find('input').type(31036)
        cy.get('[type="submit"]').click()
        cy.get('[id="inquiry-results"]')
          .should('contain', 'ID')
          .and('contain', 'FORMAT')
          .and('contain', 'DOCUMENT TYPE')
          .and('contain', 'PAGES')
          .and('contain', 'ENTRY DATE')
          .and('contain', 'DOCUMENT STATUS')
          .and('contain', 'COMPANY')
          .and('contain', 'WORKFLOW')
          .and('contain', 'WORKFLOW CATEGORY')
          .and('contain', 'WORKFLOW STATUS')
        cy.customizeCurrentViewClick()
        cy.get('[type="checkbox"]').uncheck({force:true})
          .should('not.be.checked')
        cy.contains('Apply').click().wait(1000)
        cy.get('[id="inquiry-results"]').find('th').contains('ID').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('FORMAT').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('ENTRY DATE').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('DOCUMENT STATUS').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('COMPANY').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('WORKFLOW').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('WORKFLOW CATEGORY').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('WORKFLOW STATUS').should('not.be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('DOCUMENT TYPE').should('be.visible')
        cy.get('[id="inquiry-results"]').find('th').contains('PAGES').should('be.visible')
        onLoginPage.logout()
        
    })
// Activate after bug fix
    it.skip('verifying that smart form is not selected after user log back in', () => {
      cy.navigateToSearchByID()
      cy.get('[id="searchByIdForm"]').find('input').type(37637)
      cy.get('[type="submit"]').click()
      cy.openFirstDocument()
      cy.selectThisSmartform('ExpChg')
      cy.expandButtonClick()
      cy.startButtonClick()
      cy.appendButtonClick()
      cy.collapseButtonClick()
      cy.selectThisSmartform('Acumatica')
      onLoginPage.logout()
      if(Cypress.browser.name === 'chrome'){
        onLoginPage.loginNoDialog('ik', '1234')
      }
      if(Cypress.browser.name === 'firefox'){
        onLoginPage.loginNoDialog('ihorKweb4.0', '1234')
      }
      if(Cypress.browser.name === 'edge'){
        onLoginPage.loginNoDialog('ik3', '1234')
      }
      cy.openSmartFormList()
      cy.get('.cdk-overlay-pane').find('button').each((button) => {
        cy.get(button).should('be.enabled')
      })
    })

    it('Verify aditional criteria checkboxes', () => {
      let items = []
      navigateTo.advancedSearchPage()
      cy.get('[id="additional-criteria-section"]').within(() => {
        cy.get('.mat-body-1').eq(1).find('.mat-checkbox').each(($el) => {
          cy.get($el).invoke('text').then((text1) => {
            items.push(text1)
          })      
        })
      }).then(() => {
        for(let i = 0; i < items.length; i++) {
          expect(items[i]).not.equal(items[i + 1])
          expect(items.length).to.equal(5)
          //cy.findElement(items[i]).should('not.to.be.equal', items[i + 1])
          cy.log(items[i], items[i + 1])            
        }
      })
      onLoginPage.logout()
    })

// Need finish this test
    it.skip('check same doc type', () => {
      let name = []
      cy.navigateToSearchByID()
      cy.get('[id="searchByIdForm"]').find('input').type('28068;28064;28088;28175;28176;28059')
      cy.get('[type="submit"]').click().wait(1000) 

      cy.get('tbody tr').each(($el) => {
        cy.get('[class="ng-star-inserted"]').contains('Ihor').invoke('text').then((text) => {
          name.push(text)
          cy.log(name)
        })
      }).then(() => {
        for(let i = 0; i < name.length; i++) {
          expect(name[i]).to.equal(name[i + 1])
          //cy.findElement(name[i]).should('not.to.be.equal', name[i + 1])
          cy.log(name[i], name[i + 1])            
        }
      })
    })
})

describe('intercept', () => {

  it('intercept', () => {

    cy.intercept('POST', '**/GetSiteInfo').as('postGetSite')

    cy.visit('https://wa19qa40.altec-wa.com/DocLinkWeb/#/login')

    cy.wait('@postGetSite')
    cy.get('@postGetSite').then( xhr => {
      console.log(xhr)
    })
  })
})
