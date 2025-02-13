import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
const data = new SharedArray('payment_transaction_no', function () {
    return JSON.parse(open('../file/7.json')).payment_transaction_no;
});
const data2 = new SharedArray('merchant_id', function () {
    return JSON.parse(open('../file/7.json')).merchant_id;
});
const data3 = new SharedArray('amount', function () {
    return JSON.parse(open('../file/7.json')).amount;
});
export function oauth_create_callback_cimb(scenario) {
    //Step 1 : OAUTH
    const orderId = `${__VU}${__ITER}1`;
    const payment_transaction_no = data[scenario.iterationInTest];
    const merchant_id = data2[scenario.iterationInTest];
    const amount = data3[scenario.iterationInTest]
    const url_oauth = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const payload_oauth = JSON.stringify({  
        key: "WQMfmEUDuK7RZtyY0QG/U3sRXQdDtLw591j2cajzZGzj/8PO9LlmGLgpPanCPGQRuFVkwWliuhMmJikWwxj7TuE4iZ+Rkf9lnBMgZnqsPlG6WOXPP3a4p1TyuGrq1QR+UraKNlGH+jhxZ/QOmHyFSuIoyjXR1W4TTOL7X/tJkZk=",
        orderId: "LOADTEST-241113001"+orderId
    });
    const params_oauth = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response_oauth = http.post(url_oauth, payload_oauth, params_oauth,{timeout: 300000});
    if (!response_oauth || response_oauth.error_code || (response_oauth.status !== 200 && response_oauth.status !== 201)){
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
        orderId: "LOADTEST-241113001"+orderId,
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
        return response_transaction
    }
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
    
    
//================================================================================================================================================

    //Step 3 : Callback
    const url_callback = 'https://new-ops-clone.inet.co.th/cimb/api/:partner/payment/cimb/notification/v1';
    const payload_callback = JSON.stringify({
        header: {
            requester_system: "SIBS",
            request_reference_no: "BP202004021536201234543231",
            transaction_datetime: "2024-04-23T09:33:10.000+07:00"
        },
        data: {
            biller_id: "090554900146400",
            reference1: "P24111314105692", 
            reference2: "M24102000001", 
            reference3: "66",
            biller_display_name: "",
            result: "S",
            transaction_id: "REFLOADTEST240426001",
            transaction_datetime: "2024-04-23T09:33:10.000+07:00",
            amount_paid: 1, 
            sender_account_name: "AAAA"
        }
    });
    const params_callback = {
        headers: {
            'True-Client-Ip': '184.22.188.182',
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04b25wcmQ='
        }
    };

    const response_callback = http.post(url_callback, payload_callback, params_callback,{timeout: 300000});
    
    return response_callback
}
