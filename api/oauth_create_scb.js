import http from 'k6/http';
import { check } from 'k6';
export function oauth_create_scb(cid) {
    //Step 1 : OAUTH
    const url_oauth = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `2${__VU}${__ITER}${cid}15`;
    const payload_oauth = JSON.stringify({
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        orderId: "LOADTEST-241113002" + orderId
    });
    const params_oauth = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response_oauth = http.post(url_oauth, payload_oauth, params_oauth);
    if (!response_oauth || response_oauth.error_code || (response_oauth.status !== 200 && response_oauth.status !== 201)) {
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
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        orderId: "LOADTEST-241113002" + orderId,
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
            'Authorization': 'Bearer ' + token_oauth
        }
    };

    const response_transaction = http.post(url_transaction, payload_transaction, params_transaction);
    if (!response_transaction || response_transaction.error_code || (response_transaction.status !== 200 && response_transaction.status !== 201)) {
        console.log("Create Fail!!");
        return response_transaction
    }
    return response_transaction

    //===============================================================================================================================================================================================


}
