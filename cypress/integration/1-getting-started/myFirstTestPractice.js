/// <reference types="cypress" />

const { circle } = require("leaflet");
const { createYield } = require("typescript")


describe('example to-do app', () => {

    it('first test', () => {
        Cypress.config('defaultCommandTimeout', 10000);
        // Login
        cy.visit('/')
        cy.get('form').contains('mat-form-field', 'Login').type('ik')
        cy.get('form').contains('mat-form-field', 'Password').type('1234')
        cy.get('[type="submit"]').click()
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        cy.wait(500)
        // 
        const docId = [444, 555, 999999]
        cy.get('mat-toolbar-row ul').find('li').eq(1).click()
        cy.wrap(docId).each( docId => {
            
            cy.get('mat-toolbar-row ul').contains('View Documents by ID').click()
            cy.wait(500)
            cy.get('input').type(docId)
            cy.get('mat-dialog-actions .searchButton').click()
            cy.wait(700)    
        })
        
        cy.get('mat-toolbar-row ul').eq(2).click()
        cy.get('.mat-menu-content').contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')




        // cy.get('[type="submit"]').should('contain', 'Login ')
        
        // cy.get('[type="submit"]').then(lable => {
        //     expect(lable.text()).to.equal('Login ')
        // })
        // cy.get('[type="submit"]').invoke('text').then( text => {
        //     expect(text).to.equal('Login ')
        // })
        // cy.contains('form', 'Enter your credentials:')
        // .find('[id="mat-checkbox-1"]')
        // .check({force: true})
        // .find('[id="mat-checkbox-2"]')
        // .check({force: true})
        // cy.contains('form', 'Enter your credentials:')
        // .find('[name="UserName"]')
        // .should('contain', 'Login')
        // cy.get('[name="UserName"]')
        // cy.contains('Login')
        // cy.contains('Password')
        // cy.contains('[type="submit"]','Login ')
        // cy.contains('label', ' Save Profile As ')
        // .find('[class="mat-checkbox-label"]').click()
        // cy.get('[name="RememberMe"]')
        // .parents('form')
        // .find('[type="submit"]')
        // .should('contain', 'Login ')
        // .parents('form')
        // .find('[type="checkbox"]')
        // .click()
        // cy.contains('Enter your credentials:')

        // cy.contains('form', 'Enter your credentials:').then(loginModule => {
        //     const loginField = loginModule.find('[name="UserName"]').text()
        //     expect(loginField).to.equal('Login ')
        // })
    })

    it('smart form', () => {
        
        // Login
        cy.visit('/')
        cy.get('form').contains('mat-form-field', 'Login').type('ik')
        cy.get('form').contains('mat-form-field', 'Password').type('1234')
        cy.get('form').submit()
        cy.wait(1000)
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        cy.wait(5000)
        // 
        // cy.get('mat-toolbar-row ul').find('li').eq(4).click()
        // cy.get('.mat-menu-content').then( sfMenu => {
        //     cy.wrap(sfMenu).find('button').eq(0).click()
        //     cy.wait(1000)
        // })
        cy.get('mat-toolbar-row ul').find('li').eq(4).then( sfDropdown => {
            cy.wrap(sfDropdown).click()
            cy.get('.mat-menu-content button').each(listItem => {
                const itemText = listItem.text().trim()

                cy.wrap(listItem).click()
                cy.wrap(sfDropdown).should('contain', itemText)
            })
        

        cy.get('mat-toolbar-row ul').eq(2).click()
        cy.get('.mat-menu-content').contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')
        })
    })

    it('Advanced Search DatePicker', () => {

        cy.visit('/')
        cy.get('form').contains('mat-form-field', 'Login').type('ik')
        cy.get('form').contains('mat-form-field', 'Password').type('1234')
        cy.get('form').submit()
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        cy.wait(5000)

        // cy.get('mat-toolbar-row ul').find('li').eq(0).click()
        // cy.wait(1000)
        cy.contains('mat-toolbar-row', 'Advanced Search').find('a').eq(1).click()
        cy.wait(1000)

        cy.get('mat-form-field').eq(0).find('i').then(calFrom => {
            cy.wrap(calFrom).click()
            cy.get('mat-datepicker-content .mat-calendar-body').contains('15').click()
            cy.get('mat-form-field').eq(0).find('input').invoke('prop', 'value').should('contain', '09/15/2021')
        })
        

        cy.get('mat-form-field').eq(1).find('i').then(calTo => {
            cy.wrap(calTo).click()
            cy.get('mat-datepicker-content .mat-calendar-body').contains('16').click()
            cy.get('mat-form-field').eq(1).find('input').invoke('prop', 'value').should('contain', '09/16/2021')
    
        })

        cy.get('mat-checkbox').eq(0).find('[type="checkbox"]').then( dateCheckbox => {
            cy.wrap(dateCheckbox).check({force: true})
            cy.wrap(dateCheckbox).should('be.checked')
        })
        cy.get('mat-checkbox').eq(1).find('[type="checkbox"]').then( dateCheckbox => {
            cy.wrap(dateCheckbox).click({force: true})
            cy.wrap(dateCheckbox).should('not.be.checked')
        })
        
        

        // LogOut
        cy.get('mat-toolbar-row ul').eq(2).click()
        cy.get('.mat-menu-content').contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')

    
    })

    it('batchIndex different batch selection', () => {
        cy.visit('/')
        cy.get('form').contains('mat-form-field', 'Login').type('ik')
        cy.get('form').contains('mat-form-field', 'Password').type('1234')
        cy.get('form').submit()
        cy.wait(1000)
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        cy.wait(5000)

    //    Navigate to Batch Index
        cy.get('mat-toolbar-row ul').find('li').eq(3).click()
        cy.contains('mat-toolbar-row', 'Batch Index').find('a').eq(0).click()
        cy.wait(1000)
      
        // FAIL because of slash in the assertion doesn't work for some reason
        cy.get('mat-select').then( indexDropdown => {
            cy.wrap(indexDropdown).click({force:true})
            cy.get('.mat-select-panel mat-option').each( batchPathList => {
                const batchText = batchPathList.text().trim()

                cy.wrap(batchPathList).click({force:true})
                cy.wait(2000)
                cy.wrap(indexDropdown).should('contain', batchText)
                cy.wrap(indexDropdown).click()
                cy.wait(1000)
            })

        })



        cy.get('mat-toolbar-row ul').eq(2).click()
        cy.get('.mat-menu-content').contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')


    })

    it('dropdowns in Batch Index', () => {
        cy.visit('/')
        cy.get('form').contains('mat-form-field', 'Login').type('ik')
        cy.get('form').contains('mat-form-field', 'Password').type('1234')
        cy.get('form').submit()
        cy.wait(1000)
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        cy.wait(5000)

    //    Navigate to Batch Index
        cy.get('mat-toolbar-row ul').find('li').eq(3).click()
        cy.contains('mat-toolbar-row', 'Batch Index').find('a').eq(0).click()
        cy.wait(1000)

        cy.get('mat-select').then( indexDropdown => {
            cy.wrap(indexDropdown).click({force:true})
            cy.wait(2000)
            cy.get('.mat-select-panel mat-option').eq(4).click()
            cy.wait(2000)
        })
        // Opening batch folder if locked
        cy.get('.table-responsive').then( table => {
            if(table.find('.fa-lock').length > 0) {
                cy.get('table').contains('Unlock Batch').click()
                cy.wait(1000)
                cy.get('.fa-folder-open').click()
            } else {
                cy.get('.fa-folder-open').click() 
            }
        })
           
        cy.wait(1000)
        cy.get('[class="mat-card"]').find('mat-form-field').eq(0).then( companyDropdown => {
            cy.wrap(companyDropdown).click()
            cy.get('.mat-select-panel mat-option').each( (companyList, index) => {
                const companyName = companyList.text().trim()

                cy.wrap(companyList).click()
                cy.wrap(companyDropdown).should('contain', companyName)
                if(index < 17) {
                    cy.wrap(companyDropdown).click()
                }
                cy.wait(500)
            })
        })
        
        cy.get('[class="mat-card"]').find('mat-form-field').eq(1).then( typeDropdown => {
            cy.wrap(typeDropdown).click()
            cy.get('.mat-select-panel mat-option').each( (typeList, index) => {
                const typeName = typeList.text().trim()

                cy.wrap(typeList).click()
                cy.wrap(typeDropdown).should('contain', typeName)
                if(index < 108) {
                    cy.wrap(typeDropdown).click()
                }
                cy.wait(1000)
            })
        })

        cy.get('mat-toolbar-row ul').eq(2).click()
        cy.get('.mat-menu-content').contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')

    })
})
