/// <reference types="cypress" />

const baseUrlCloud = 'https://test.altec-cloud.com'
let tabId = []
let tabIdClient = []

describe('API CLOUD test', () => {

    before('token', () => {
        cy.request({
            method: 'POST',
            url: baseUrlCloud+'/DocLinkWebService/api/Security/LoginViaProfile',
            body: {
                "ProfileName":"ik","ServiceURL":"https://test.altec-cloud.com/DocLinkWebService/api/",
                "ProfileData":"Kz6Bbq1Loa6mleIvq1gUxf2uj5jTd6c1nkb7Ie5TGk9+bPvBl//c9NksQMRVxyN/",
                "PasswordRequired":false,"AutoLogin":false,"UserName":"ik","SiteCode":"40test",
                "IdentityProvider":"None","WindowsAuth":false,
                "Password":"UPorV1mTc/OrnJRscbTdATjGy5Wt4YsJq4nascwpKJxTsOLlFe1Ec9rRHxlNlM6CRVckj1MLXlYnnW5OwCCGxmp5Lfk8oZnSE6xSt6cfimmHvSV1URc3uMpsMX1il7OujZULPnn/drAYJRb5xm7POGO7XEXxISPgId3ufHZhsYM=",
                "RememberMe":true,"ImpersonateForWindowsAuthentication":false,"PreviousAuthCode":null,
                "CloudConnection":{"RemotingEndPointURL":"https://test.altec-cloud.com/dlremoteserver/doclinkServer.soap",
                "DBServer":"qasqlsrv01a","DBName":"40test","ManifestURL":"https://test.altec-cloud.com/DLRemote",
                "WebClientServiceEndpoint":"https://test.altec-cloud.com/DocLinkWebService/api/",
                "WebClientSmartFormEndpoint":"https://test.altec-cloud.com/DocLinkSmartFormService/api/"}
                },
            }).then((res) => {
                expect(res.body).to.have.property('AuthCode')
                window.token = res.body.AuthCode
                cy.log(window.token)
        })
    })

    after('LOGOUT', () => {
        
        cy.request({
            method: 'POST',
            url: baseUrlCloud+'/DocLinkWebService/api/Security/Logout',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
        })
    })

    it('Get List Of Smart Forms for Viewer Tabs', () => {
        cy.request({
            method: 'GET',
            url: baseUrlCloud+'/DocLinkWebService/api/SmartForms/ViewerTabs',
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
            url: baseUrlCloud+'/DocLinkWebService/api/SmartForms/ClientTabs',
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
                url: baseUrlCloud+'/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId='+tabId[i]+'&documentId=123',
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
                url: baseUrlCloud+'/DocLinkSmartFormService/api/DistributionStamp/GetSmartFormConfig',
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
                url: baseUrlCloud+'/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId='+tabIdClient[i],
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
                url: baseUrlCloud+'/DocLinkSmartFormService/api/DistributionStamp/GetSmartFormConfig',
                body: {
                    "Settings":{"CustomSettings":[{"Name":"showBurnWarning","Setting":true}]}
                }
            }).should((resp) => {
                expect(resp.status).to.be.eq(200)
                //cy.log(JSON.stringify(resp.body))
            })
        }       
    })

    it('Get Doc ID data for doc 123', () => {
        cy.request({
            method: 'GET',
            url: baseUrlCloud+'/DocLinkWebService/api/Document/GetOriginationData?documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0]).to.have.property('DocumentID')
            // expect(res.body[0].BatchFileId).to.eq('70')
            // expect(res.body[0].Created).to.eq('4/8/2019 10:03:00 AM')
            cy.log(JSON.stringify(res.body))
        })
    })
})