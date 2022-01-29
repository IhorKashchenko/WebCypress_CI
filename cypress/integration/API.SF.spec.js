/// <reference types="cypress" />


let tabId = []
let tabIdClient = []
const baseUrlQA = 'https://wa19qa40.altec-wa.com'


describe('API test', () => {

    before('GET AuthCode', () => {
        cy.request({
            method: 'POST',
            url: baseUrlQA+'/DocLinkWebService/api/Security/LoginViaProfile',
            body: {
                "ProfileName":"ik",
                "ServiceURL":"https://WA19QA40.altec-wa.com/DocLinkWebService/api/",
                "ProfileData":"Kz6Bbq1Loa6mleIvq1gUxf2uj5jTd6c1nkb7Ie5TGk9+bPvBl//c9NksQMRVxyN/",
                "PasswordRequired":false,"AutoLogin":false,"UserName":"ik","SiteCode":"",
                "IdentityProvider":"None","WindowsAuth":false,
                "Password":"CdoQpM2hdFYtBysB54x0r+1+u1rqCGwS3Zu/uILoaLihHdiwBn0+1x05hvhdpr4u1RCGA0bG9anWb+t11au6ODrweYaDo2c8zlZixqyL7e1EvEDQqpX9bMGueV8rfV2L6GRPgyXPw4G/qEFeXXQq7ba9Gv8uX3z70kztq3U4l6o=",
                "RememberMe":true,"ImpersonateForWindowsAuthentication":false,"PreviousAuthCode":null,"CloudConnection":null
                },
            }).then((res) => {
                expect(res.body).to.have.property('AuthCode')
                window.token = res.body.AuthCode
        })
    })

    after('LOGOUT', () => {
        cy.request({
            method: 'POST',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/Security/Logout',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
        })
    })

    it.skip('ALL Smart Forms verification', () => {
        for(let i = 0; i< urls.length; i++) {
            cy.request({
                method: 'GET',
                url: urls[i],
                headers: {
                    AuthCode: window.token
                }
            })
            .then((res) => {
                expect(res.status).to.be.eq(200)
                cy.wrap(res.body[0].Name).should('not.be.empty')
                cy.log(JSON.stringify(res.body))
            })
            cy.request({
                method: 'POST',
                url: baseUrlQA+'/DocLinkSmartFormService/api/DistributionStamp/GetSmartFormConfig',
                body: {
                    "Settings":{"CustomSettings":[{"Name":"showBurnWarning","Setting":true}]}
                }
            }).should((resp) => {
                expect(resp.status).to.be.eq(200)
                //cy.log(JSON.stringify(resp.body))
            })
        }
        
    })

    it('Get List Of Smart Forms for Viewer Tabs', () => {
        cy.request({
            method: 'GET',
            url: baseUrlQA+'/DocLinkWebService/api/SmartForms/ViewerTabs',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
                cy.wrap(res.body.tabs).each(($el) => {
                    tabId.push($el.SmartFormsTabId)
                })
                cy.log(tabId)
        })
    })

    it('Get List Of Smart Forms for Client Tabs', () => {
        cy.request({
            method: 'GET',
            url: baseUrlQA+'/DocLinkWebService/api/SmartForms/ClientTabs',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
                cy.wrap(res.body.tabs).each(($el) => {
                    tabIdClient.push($el.SmartFormsTabId)
                })
                cy.log(tabIdClient)
        })
    })

    it('Viewer Tabs Smart Forms verification', () => {
        for(let i = 0; i< tabId.length; i++) {
            cy.request({
                method: 'GET',
                url: baseUrlQA+'/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId='+tabId[i]+'&documentId=123',
                headers: {
                    AuthCode: window.token
                }
            })
            .then((res) => {
                expect(res.status).to.be.eq(200)
                cy.wrap(res.body[0].Name).should('not.be.empty')
                cy.log(JSON.stringify(res.body))
            })
            cy.request({
                method: 'POST',
                url: baseUrlQA+'/DocLinkSmartFormService/api/DistributionStamp/GetSmartFormConfig',
                body: {
                    "Settings":{"CustomSettings":[{"Name":"showBurnWarning","Setting":true}]}
                }
            }).should((resp) => {
                expect(resp.status).to.be.eq(200)
                //cy.log(JSON.stringify(resp.body))
            })
        }
        
    })

    it('Client Tabs Smart Forms verification', () => {
        for(let i = 0; i< tabIdClient.length; i++) {
            cy.request({
                method: 'GET',
                url: baseUrlQA+'/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId='+tabIdClient[i],
                headers: {
                    AuthCode: window.token
                }
            })
            .then((res) => {
                expect(res.status).to.be.eq(200)
                cy.wrap(res.body[0].Name).should('not.be.empty')
                cy.log(JSON.stringify(res.body))
            })
            cy.request({
                method: 'POST',
                url: baseUrlQA+'/DocLinkSmartFormService/api/DistributionStamp/GetSmartFormConfig',
                body: {
                    "Settings":{"CustomSettings":[{"Name":"showBurnWarning","Setting":true}]}
                }
            }).should((resp) => {
                expect(resp.status).to.be.eq(200)
                //cy.log(JSON.stringify(resp.body))
            })
        }
        
    })

})