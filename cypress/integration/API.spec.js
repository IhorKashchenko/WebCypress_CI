/// <reference types="cypress" />


describe('API test', () => {

    before('GET AuthCode', () => {
        cy.request({
            method: 'POST',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/Security/LoginViaProfile',
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

    it('Get Doc ID data for doc 123', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/Document/GetOriginationData?documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0]).to.have.property('BatchName')
            expect(res.body[0].BatchFileId).to.eq('70')
            expect(res.body[0].Created).to.eq('4/8/2019 10:03:00 AM')
            cy.log(JSON.stringify(res.body))
        })
    })

    //Verifying Smart Forms on the Main tab

    it('Smart Forms verification Visa CC Processing', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10005',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Visa CC Processing')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Expense Report (W/ Combined Attachments)', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10001',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Expense Report (W/ Combined Attachments)')
            cy.log(JSON.stringify(res.body))
        })
    })    

    it('Smart Forms verification Ihor Bool only', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10008',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Ihor Bool only')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Ihor Doc Creation Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10003',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Ihor Doc Creation Test')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Jake\'s Doc Creation Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10002',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Jake\'s Doc Creation Test')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification James Document Processing', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10006',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('James Document Processing')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification w/ XSLT Template', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetClientTabSmartForms?tabId=10007',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('w/ XSLT Template')
            cy.log(JSON.stringify(res.body))
        })
    })

//Verifying Smart Forms from the Viewer

    it('Smart Forms verification Acumatica', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10002&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Acumatica 2017R2')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Dynamics Business Central GL', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10018&documentId=123',
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
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10008&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Dynamics 365 for Finance and Operations, Enterprise Edition GL Smart Form')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification 1/11/21 -test add/remove', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10022&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('1/11/21 -test add/remove')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Page Creation (W/ Attachments)', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10000&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Page Creation (W/ Attachments)')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Screen import for GP 10 - 2015', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10009&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Screen import for GP 10 - 2015')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Screen import for GP 10 - 2015', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10016&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Screen import for GP 10 - 2015')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Web service import for GP 2013', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10001&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Web service import for GP 2013')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Ihor Page Creation Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10014&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Ihor Page Creation Test')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification IHOR Sage_300 5.6a - 2014', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10015&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('IHOR Sage_300 5.6a - 2014')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage Intacct GL Smart Form', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10012&documentId=123',
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
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10003&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Jake\'s Doc Creation Test')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Jake\'s Dynamics GP GL', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10005&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Jake\'s Dynamics GP GL Smart Form Web service import for GP 2013')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification eConnect import for BS/Key2Act 2016', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10019&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('eConnect import for BS/Key2Act 2016')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Web service import for NAV 2016 and higher', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10020&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Web service import for NAV 2016 and higher')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification SL 7.0 - 2015', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10010&documentId=123',
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
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10011&documentId=123',
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
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10006&documentId=123',
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
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10021&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage 500 7.0 - 2014')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification w/ XSLT Template', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10017&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('w/ XSLT Template')
            cy.log(JSON.stringify(res.body))
        })
    })

    it('Smart Forms verification Sage X3 GL Smart Form', () => {
        cy.request({
            method: 'GET',
            url: 'https://wa19qa40.altec-wa.com/DocLinkWebService/api/SmartForms/GetViewerTabSmartForms?tabId=10013&documentId=123',
            headers: {
                AuthCode: window.token
            }
        }).then((res) => {
            expect(res.status).to.be.eq(200)
            expect(res.body[0].Description).to.eq('Sage X3 GL Smart Form')
            cy.log(JSON.stringify(res.body))
        })
    })
});