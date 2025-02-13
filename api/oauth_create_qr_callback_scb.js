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
export function oauth_create_qr_callback_scb(scenario) {
    //Step 1 : OAUTH
    const url_oauth = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `1${__VU}${__ITER}1`;
    const payload_oauth = JSON.stringify({  
         key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
         orderId: "LOADTEST-241113002"+orderId
    });
    const params_oauth = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response_oauth = http.post(url_oauth, payload_oauth, params_oauth,{timeout: 300000});
    if (!response_oauth || response_oauth.error_code || (response_oauth.status !== 200 && response_oauth.status !== 201)){
        console.log("Oauth Fail");
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
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        orderId: "LOADTEST-241113002"+orderId,
        orderDesc: "LOAD TEST SCB",
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
        console.log("Create Fail");
        return response_transaction
    }
    const responseBody_transaction = JSON.parse(response_transaction.body);
    const token_transaction = responseBody_transaction.data.accessToken;
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
    const url_qr = 'https://new-ops-clone.inet.co.th/scb/api/v1/payment/qr';
    const payload_qr = JSON.stringify({
        accessToken: ''+token_transaction
    });

    const params_qr = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response_qr = http.post(url_qr, payload_qr, params_qr,{timeout: 300000});
    if (!response_qr || response_qr.error_code || (response_qr.status !== 200 && response_qr.status !== 201)){
        console.log("Create Fail");
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

    //Step 4: Callback
    const payment_transaction_no = data[scenario.iterationInTest];
    const merchant_id = data2[scenario.iterationInTest];
    const amount = data3[scenario.iterationInTest]
    const billPaymentRef3 = `${__VU}${__ITER}2`;
    const url_callback = 'https://new-ops-clone.inet.co.th/scb/api/v1/payment/qr-callback';

    const payload_callback = JSON.stringify({
        amount: ""+amount,
        billPaymentRef1: ""+payment_transaction_no,
        billPaymentRef2: ""+merchant_id,
        billPaymentRef3: "NJBP"+billPaymentRef3,
        channelCode: "PMH",
        currencyCode: "764",
        payeeAccountNumber: "0987654321",
        payeeName: "TestBiller1711433086",
        payeeProxyId: "819064831660717",
        payeeProxyType: "BILLERID",
        payerAccountNumber: "5121090001",
        payerName: "Thawat Sophabud",
        payerProxyId: "5121090001",
        payerProxyType: "ACCOUNT",
        receivingBankCode: "014",
        sendingBankCode: "014",
        transactionDateandTime: "2024-04-04T11:11:39+07:00",
        transactionId: "LOADTEST"+billPaymentRef3,
        transactionType: "Domestic Transfers"
    });

    const params_callback = {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': '__cf_bm=OB.Eb3YiVk4qS8fCnJpg4vIA6Tn_8oZLo3jQvwxCz9s-1711509545-1.0.1.1-YVef23500PEE1PxfAJHO7Ke_mV7z1jJksp58_U_SbozddU04PxHw_aVgc55uP4qNBzHoeck43EnSAWa_KJkv9g; __cfruid=b569a32fdc9e1d3c4d318e9ea9540b4c361bf28e-1711509545'
        }
    };

    const response_callback = http.post(url_callback, payload_callback, params_callback,{timeout: 300000});
    if (!response_callback || response_callback.error_code || (response_callback.status !== 200 && response_callback.status !== 201)){
        console.log("Callback Fail");
        return response_callback
    }
    return response_callback
}
