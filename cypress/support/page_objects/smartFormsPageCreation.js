
export class SmartFormsDocCreationPage{
       
    
    selectCCProcesingDC(){
        cy.contains('CC Processing').click()
    }

    selectexpRptCombineDC(){
        cy.contains('ExpRpt Combine').click()
    }

    selectexpenseReportDC(){
        cy.contains('Expense Report').click()
    }
    selectIhorDocumentCreation(){
        cy.contains('Ihor Document Creation').click()
    }

    selectxsltDC(){
        cy.contains('XSLT').click()
    }



}

export const onSFcreationPage = new SmartFormsDocCreationPage()