

export class LoginPage{
 
    

    login(username, password){
        cy.get('form').contains('mat-form-field', 'Login').type(username)
        cy.get('form').contains('mat-form-field', 'Password').type(password)
        cy.get('[type="submit"]').click()
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.wait(7000)
    }

    loginCloud(username, password){
        cy.get('form').contains('mat-form-field', 'Site Code').type('40test')
        cy.get('form').contains('mat-form-field', 'Login').type(username)
        cy.get('form').contains('mat-form-field', 'Password').type(password)
        cy.get('[type="submit"]').click()
        cy.get('mat-dialog-actions')
        .contains('button', 'No')
        .click({force: true})
        cy.wait(7000)
    }

    logout(){
        cy.menuBtnClick().wait(300)
        cy.get('.mat-menu-content').contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')
    }

    logout_mobile(){
        cy.get('.mat-menu-trigger').eq(2).click({force:true}).wait(500)
        cy.contains('button', 'Log Out').click({force: true})
        cy.get('form mat-form-field').should('contain', 'Login')
    }



}

export const onLoginPage = new LoginPage()