/// <reference types="cypress" />

import { onLoginPage }  from "../support/page_objects/loginPage"

const urls = ['https://wa19qa40.altec-wa.com/DoclinkWeb/#/login',
              'https://test.altec-cloud.com/DocLinkWeb/#/login']


describe('External User', () => {

    urls.forEach(url => {
    
        const loginOpt = (() => {
          cy.visit(url)
          if(url == urls[1]){
          onLoginPage.loginCloud('ik-Ex', '1234')
          } else {
          onLoginPage.login('ikext', '1234')
          }
        })


        it('Open document and check rotation ' + url, () => {
            loginOpt()
            cy.get('[id="search-list"]').contains('IhorA').click()
            cy.get('[id="quick-search"]').find('button').contains('Search').click()
            cy.openFirstDocument()
            cy.get('[id="document-details-panel"]')
              .should('contain.text', 'Document')
              .and('contain.text', 'Origination')
              .and('contain.text', 'Index Property Values')
            cy.RotateLeftClick()
            cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(270deg)')
            cy.RotateRightClick()
            cy.get('[class="canvas-container"]').should('have.attr', 'style').should('contain' ,'transform: rotate(0deg)')
            onLoginPage.logout()
        })

        it('Check Invert Colors '+ url, () => {
            loginOpt()
            cy.get('[id="search-list"]').contains('IhorA').click()
            cy.get('[id="quick-search"]').find('button').contains('Search').click()
            cy.openFirstDocument()
            cy.get('[id="imageViewPort"]').should('have.attr','class').should('not.contain' ,'viewer-container no-thumbnails inverted')
            cy.get('[id="document-image-container"]').find('[id="imageviewer-more-items"]').click()
            cy.contains(' Invert colors ').click()
            cy.get('[id="imageViewPort"]').should('have.attr','class').should('contain' ,'viewer-container no-thumbnails inverted')
            cy.get('[class="lower-canvas"]').should('have.attr', 'style').should('contain' ,'filter: invert(1)')
            onLoginPage.logout()
        })

        it('viewGallery '+ url, () => {
            loginOpt()
            cy.menuBtnClick()
            cy.MySettingsBtnClick()
            cy.contains(' Gallery ').click()
            cy.contains(' Save ').click()
            cy.get('[id="search-list"]').contains('IhorA').click()
            cy.get('[id="quick-search"]').find('button').contains('Search').click()
            cy.contains('VIEW').should('contain', 'VIEW')
            cy.contains('ACTIONS').should('contain', 'ACTIONS')
            onLoginPage.logout()
        })

        it('viewList '+ url, () => {
            loginOpt()
            cy.menuBtnClick()
            cy.MySettingsBtnClick()
            cy.contains(' List ').click()
            cy.contains(' Save ').click()
            cy.get('[id="search-list"]').contains('IhorA').click()
            cy.get('[id="quick-search"]').find('button').contains('Search').click()
            cy.contains(' View ').should('contain', ' View ')
            cy.contains(' Actions ').should('contain', ' Actions ')
            onLoginPage.logout()
        })

        it('LanguageChangeToFrench '+ url, () => {
            loginOpt()
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
    
        it('LanguageChangeToSpanish '+ url, () => {
            loginOpt()
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
    
        it('LanguageChangeToBritish '+ url, () => {
            loginOpt()
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
    })
})
