export class NavigationPage{

    quickSearchPage(){
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        .click({force:true}).then(() => {
            cy.get('mat-toolbar-row').find('li').eq(1).click({force:true})
        })
    }
    
    advancedSearchPage(){
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        .click({force:true})
        cy.get('.mat-toolbar-row').eq(1).within(() => {
            cy.contains('Advanced Search').click({force:true})
        })
    }

    fullTextSearchPage(){
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        .click({force:true}).then(() => {
            cy.contains('Full Text Search').click({force:true})
        })
    }

    viewByIdSearchPage(){
        cy.get('ul').contains('li', 'Search').should('contain', 'Search')
        .click({force:true}).then(() => {
            cy.contains('View Documents by ID').click({force:true})
        })
    }

    workflowSearchPage(){
        cy.get('mat-toolbar-row ul').find('li').eq(2).click()
        cy.wait(500)
        cy.get('mat-toolbar-row').eq(1).find('li').eq(0).contains('Search').click({force:true})
        cy.wait(2000)
    }

    workflowSupervisorPage(){
        cy.get('mat-toolbar-row ul').find('li').eq(2).click()
        cy.contains('Supervisor').click({force:true})
        cy.wait(500)
    }

    workflowDelegatePage(){
        cy.get('mat-toolbar-row ul').find('li').eq(2).click()
        cy.contains('Delegate').click({force:true})
        cy.wait(500)
    }

    batchIndexPage(){
        cy.get('mat-toolbar-row ul').find('li').eq(3).click()
        cy.contains('mat-toolbar-row', 'Batch Index').find('a').eq(0).click()
        cy.wait(500)
    }

    versionControlPage(){
        cy.contains('Tools').click()
        cy.get('mat-toolbar-row').eq(1).find('li').eq(1).click()
        cy.wait(500)
    }

    smartFormsPage(){
        cy.get('mat-toolbar-row ul').find('li').eq(4).click()
        cy.wait(500)
    }
}

export const navigateTo = new NavigationPage()
