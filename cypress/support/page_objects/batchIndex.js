export class BatchIndex{

    openTiffFolder(){
        cy.get('mat-select').then( indexDropdown => {
            cy.wait(2000)
            cy.wrap(indexDropdown).click({force:true})
            cy.wait(2000)
            cy.get('.mat-select-panel mat-option').eq(5).click()
            cy.wait(2000)
        })
        cy.openBatchIfLocked()
       
    }

    sendToWorkflowEnableClick(){
        cy.contains(' send to workflow ').click()
    }

    saveButtonClick(){
        cy.contains('Save').click({force:true})
        cy.wait(2000)
    }
    
    searchNewCreatedDoc(){
        
        cy.get('tbody tr').first().find('td').eq(2).invoke('text').then( docID => {
            cy.wait(2000)
            cy.get('[id="batchindex-return-to-list"]').click({force:true})
            cy.wait(500)
            cy.navigateToSearchByID()
            cy.get('[id="searchByIdForm"]').find('input').type(docID)
            cy.get('[type="submit"]').click()
            cy.wait(1000)
        })
    }
}
export const onBatchIndexPage = new BatchIndex()
