export class LoginPage{
 
    login(username, password){
        cy.get('form').contains('mat-form-field', 'Login').type(username)
        cy.get('form').contains('mat-form-field', 'Password').type(password)
        cy.get('[type="submit"]').click()
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|106', '26'); // ik
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|167', '26');  // ikExt
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|55', '26');  // IhorKweb4.0
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|158', '26');  // ik3
    }

    loginNoDialog(username, password){
        cy.get('form').contains('mat-form-field', 'Login').type(username)
        cy.get('form').contains('mat-form-field', 'Password').type(password)
        cy.get('[type="submit"]').click()
    }

    loginCloud(username, password){
        cy.get('form').contains('mat-form-field', 'Site Code').type('40test')
        cy.get('form').contains('mat-form-field', 'Login').type(username)
        cy.get('form').contains('mat-form-field', 'Password').type(password)
        cy.get('[type="submit"]').click()
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|12', '8');  //ik 
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|62', '8');  //ik-ex
        window.localStorage.setItem('GLOBAL_DEFAULT_ACTIVE_VERSION|53', '8');  //ik2
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