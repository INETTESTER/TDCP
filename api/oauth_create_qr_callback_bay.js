import http from 'k6/http';
import { check } from 'k6';
export function oauth_create_qr_callback_bay() {
    //Step 1 : OAUTH
    const url_oauth = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `25${__VU}${__ITER}2`;
    const payload_oauth = JSON.stringify({  
         key: "cQkSVpaRegca85zVwUnqrLfiJE6FmfZBL3Q2VmldoCa2xzoh6l65g5qtjEwWDTuUHtJA02WO5wlVndXPu2R7wfuSK89B4iFFNGNm397P4FqTgrfa2nai2uogUahclyqWxsDZFvN8bkow4HewrKb92Z49WbZmcYL3wp7vRVgVhvo=",
         orderId: "LOADTEST-241113002"+orderId
    });
    const params_oauth = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response_oauth = http.post(url_oauth, payload_oauth, params_oauth);
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
        key: "cQkSVpaRegca85zVwUnqrLfiJE6FmfZBL3Q2VmldoCa2xzoh6l65g5qtjEwWDTuUHtJA02WO5wlVndXPu2R7wfuSK89B4iFFNGNm397P4FqTgrfa2nai2uogUahclyqWxsDZFvN8bkow4HewrKb92Z49WbZmcYL3wp7vRVgVhvo=",
        orderId: "LOADTEST-241113002"+orderId,
        orderDesc: "LOAD TEST SCB",
        amount: 1,
        apUrl: "https://www.google.co.th",
        regRef: "", 
        payType: "QR"
    });
    const params_transaction = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token_oauth
        }
    };

    const response_transaction = http.post(url_transaction, payload_transaction, params_transaction);
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
    const url_qr = 'https://new-ops-clone.inet.co.th/bay/api/v1/payment/qr';
    const payload_qr = JSON.stringify({
        accessToken: ''+token_transaction
    });

    const params_qr = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response_qr = http.post(url_qr, payload_qr, params_qr);
    if (!response_qr || response_qr.error_code || (response_qr.status !== 200 && response_qr.status !== 201)){
        console.log("QR Fail");
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
    
    const url_qr_callback = 'https://new-ops-clone.inet.co.th/bay/api/v1/payment/qr/callback';
    const payload_qr_callback = JSON.stringify({
      trxId: '2412201025367662',
      trxStatus: '1',
      amount: '1',
      datetime: '2024-12-19T17:05:38Z',
      terminalId: '12000012131145',
      feeMerchant: '1.00',
      fromAccount: '123412341234',
      billerId: '010754400009425',
      channel: '4',
    });
    const params_qr_callback = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json',
        }
    };
  
    const res_qr_callback = http.post(url_qr_callback, payload_qr_callback, params_qr_callback);
    if (!res_qr_callback || res_qr_callback.error_code || (res_qr_callback.status !== 200 && res_qr_callback.status !== 201)){
        console.log("Callback Fail");
        return res_qr_callback
    }
    return res_qr_callback
}
