/// <reference types="cypress" />


describe('API CLOUD test', () => {

    before('token', () => {
        cy.request({
            method: 'POST',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/Security/LoginViaProfile',
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
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/Security/Logout',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
        })
    })

    it('Get Doc ID data for doc 123', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/Document/GetOriginationData?documentId=123',
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

// Verifying Smart Forms from the Main Tab

    it('Smart Forms verification Expense Report (W/ Attachments)', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10004',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Expense Report (W/ Attachments)')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Ihor Doc Creation', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10005',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Ihor Doc Creation')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Jake\'s Doc Creation Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10002',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Jake\'s Doc Creation Test')
            cy.log(JSON.stringify(res.body))
        })
    })

// Verifying Smart Forms from the Viewer

    it('Smart Forms verification Acumatica 2017R2', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10006&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Acumatica 2017R2')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Dynamics Business Central GL Smart Form', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10014&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Dynamics Business Central GL Smart Form')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Dynamics 365', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10007&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Dynamics 365 for Finance and Operations, Enterprise Edition GL Smart Form')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Screen import for GP 10 - 2015', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=-9998&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Screen import for GP 10 - 2015')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Epicor ERP 10', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10012&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Epicor ERP 10')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Page Creation (W/ Attachments)', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10003&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Page Creation (W/ Attachments)')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Web service import for GP 2013', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10002&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Web service import for GP 2013')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification eConnect import for GP/BS 2013', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10001&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('eConnect import for GP/BS 2013')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage Intacct GL Smart Form', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10005&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage Intacct GL Smart Form')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Jake\'s Doc Creation Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10000&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Jake\'s Doc Creation Test')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Processing SF', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10004&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Processing SF')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification SL 7.0 - 2015', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10009&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('SL 7.0 - 2015')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage 100 4.3 - 2014', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10010&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage 100 4.3 - 2014')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage 300 5.6a - 2014', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10008&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage 300 5.6a - 2014')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage 500 7.0 - 2014', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10013&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage 500 7.0 - 2014')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage X3 GL Smart Form', () => {
        cy.request({
            method: 'GET',
            url: 'https://test.altec-cloud.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10011&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage X3 GL Smart Form')
            cy.log(JSON.stringify(res.body))
        })
    })
})