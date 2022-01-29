/// <reference types="cypress" />

const baseUrlQA = 'https://wa19qa40.altec-wa.com'

const allUrl = [
     baseUrlQA+'/DocLinkWebService/api/DocumentInquiry/CustomInquiries',
     baseUrlQA+'/DocLinkWebService/api/DocumentInquiry/SavedInquiries',
    baseUrlQA+'/DocLinkWebService/api/Workflow/WorkflowFavorites',
    baseUrlQA+'/DocLinkWebService/api/Workflow/UserWorkflowDelegations',
    baseUrlQA+'/DocLinkWebService/api/Workflow/QueuesForWorkflow?workflowId=10000',
    baseUrlQA+'/DocLinkWebService/api/Workflow/WorkflowDelegations',
    baseUrlQA+'/DocLinkWebService/api/Files/PrintSeparatorPage',
    baseUrlQA+'/DocLinkWebService/api/Files/DownloadSeparatorPage',

    baseUrlQA+'/DocLinkWebService/api/Document/GetOriginationData?documentId=17',
    baseUrlQA+'/DocLinkWebService/api/Document/GetIndexData?documentId=17',
    baseUrlQA+'/DocLinkWebService/api/Document/Notes?id=17',
    baseUrlQA+'/DocLinkWebService/api/Document/GetAnnotationSummary?documentId=17',
    baseUrlQA+'/DocLinkWebService/api/Document/GetAuditHist?documentId=17',
    baseUrlQA+'/DocLinkWebService/api/Document/GetIndexData?documentId=17',
    baseUrlQA+'/DocLinkWebService/api/DocumentImage/GetPageProperties?documentId=17&pageNum=1',
    baseUrlQA+'/DocLinkWebService/api/DocumentImage/NativeFile/17',
    baseUrlQA+'/DocLinkWebService/api/DocumentImage/PDF?id=17&addNotes=false',
    baseUrlQA+'/DocLinkWebService/api/DocumentImage/PDF?id=17&addNotes=true',

]



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
            url: baseUrlQA+'/DocLinkWebService/api/Document/GetOriginationData?documentId=123',
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

    it('MAIN LINKS verification', () => {
        for(let i = 0; i< allUrl.length; i++) {
            cy.request({
                method: 'GET',
                url: allUrl[i],
                headers: {
                    AuthCode: window.token
                }
            })
            .then((res) => {
                expect(res.status).to.be.eq(200)
            })
            
        }
        
    })
});