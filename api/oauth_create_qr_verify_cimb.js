import http from 'k6/http';
import { check } from 'k6';
export function oauth_create_qr_verify_cimb() {
    //Step 1 : OAUTH
    const url_oauth = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `1${__VU}${__ITER}1`;
    const payload_oauth = JSON.stringify({  
        key: "WQMfmEUDuK7RZtyY0QG/U3sRXQdDtLw591j2cajzZGzj/8PO9LlmGLgpPanCPGQRuFVkwWliuhMmJikWwxj7TuE4iZ+Rkf9lnBMgZnqsPlG6WOXPP3a4p1TyuGrq1QR+UraKNlGH+jhxZ/QOmHyFSuIoyjXR1W4TTOL7X/tJkZk=",
        orderId: "IMAGE-TEST-QR-CIMB"+orderId
    });
    const params_oauth = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response_oauth = http.post(url_oauth, payload_oauth, params_oauth,{timeout: 300000});
    if (!response_oauth || response_oauth.error_code || (response_oauth.status !== 200 && response_oauth.status !== 201)){
        console.log("Oauth Fail!!");
        return response_oauth
    }
    const responseBody_oauth = JSON.parse(response_oauth.body);
    const token_oauth = responseBody_oauth.data.token;
    check(response_oauth, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
        });
 
//============================================================================================================================================================================================

    //Step 2 : Create Transactions
    const url_transaction = 'https://new-ops-clone.inet.co.th/api/v1/payment-transactions/access-token';
    const payload_transaction = JSON.stringify({ 
        key: "WQMfmEUDuK7RZtyY0QG/U3sRXQdDtLw591j2cajzZGzj/8PO9LlmGLgpPanCPGQRuFVkwWliuhMmJikWwxj7TuE4iZ+Rkf9lnBMgZnqsPlG6WOXPP3a4p1TyuGrq1QR+UraKNlGH+jhxZ/QOmHyFSuIoyjXR1W4TTOL7X/tJkZk=",
        orderId: "IMAGE-TEST-QR-CIMB"+orderId,
        orderDesc: "LOAD TEST CIMB",
        amount: 1,
        apUrl: "https://www.google.co.th",
        regRef: "", 
        payType: "QR"
    });
    const params_transaction = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token_oauth
        }
    };

    const response_transaction = http.post(url_transaction, payload_transaction, params_transaction,{timeout: 300000});
    if (!response_transaction || response_transaction.error_code || (response_transaction.status !== 200 && response_transaction.status !== 201)){
        console.log("Create Fail!!");
        return response_transaction
    }
    const responseBody_transaction = JSON.parse(response_transaction.body);
    const token_transaction = responseBody_transaction.data.accessToken;
    const ref1 = responseBody_transaction.data.ref1;
    const ref2 = responseBody_transaction.data.ref2;
    check(response_transaction, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
        });
    
//===============================================================================================================================================================================================
    
    //Step 3 : QR Code
    const url_qr = 'https://new-ops-clone.inet.co.th/cimb/api/v1/qr-code/cimb';
    const payload_qr = JSON.stringify({
        accessToken: ''+token_transaction
    });

    const params_qr = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04Zzt2aU49eWpvVTRU'
        }
    };
    const response_qr = http.post(url_qr, payload_qr, params_qr,{timeout: 300000});
    if (!response_qr || response_qr.error_code || (response_qr.status !== 200 && response_qr.status !== 201)){
        console.log("QR Code Fail!!");
        return response_qr
    }
    check(response_qr, {
        '200 OK': (r) => r.status === 200,
        '201 Created': (r) => r.status === 201,
        '204 No Content': (r) => r.status === 204,
        '400 Bad Request': (r) => r.status === 400,
        '401 Unauthorized': (r) => r.status === 401,
        '403 Forbidden': (r) => r.status === 403,
        '404 Not Found': (r) => r.status === 404,
        '429 Too Many Requests': (r) => r.status === 429,
        '500 Internal Server Error': (r) => r.status === 500,
        '502 Bad Gateway': (r) => r.status === 502,
        '503 Service Unavailable': (r) => r.status === 503,
        '504 Gateway Timeout': (r) => r.status === 504,
        });

    //Step 4 : Verify
    let url_verify = 'https://new-ops-clone.inet.co.th/cimb/api/payment/cimb/verifydata/v1';
    let headers_verify = {
    'True-Client-Ip': '184.22.188.182',
    'Content-Type': 'application/json',
    'Authorization': '••••••', // แทนที่ด้วย Token จริง
    };
    let payload_verify = JSON.stringify({
     header: {
         requester_system: 'SIBS',
        request_reference_no: 'BP202004021536201234543231',
        transaction_datetime: '2025-02-10T09:33:00.000+07:00',
    },
    data: {
      biller_id: '090554900146400',
      reference1: ''+ref1,
      reference2: ''+ref2,
      reference3: '66',
      transaction_id: 'REFLOADTEST250210001',
      transaction_datetime: '2025-02-10T09:33:00.000+07:00',
      amount_paid: 1,
      sender_account_name: 'AAAA',
    },
  });

  const response_verify = http.post(url_verify, payload_verify, headers_verify,{timeout: 300000});
  if (!response_verify || response_verify.error_code || (response_verify.status !== 200 && response_verify.status !== 201)){
      console.log("Verify Fail!!");
      return response_verify
  }
  return response_verify
}
