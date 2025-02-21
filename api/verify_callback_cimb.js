import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { check } from 'k6';
const data = new SharedArray('payment_transaction_no', function () {
    return JSON.parse(open('../file/cimb1.json')).payment_transaction_no;
});
const data2 = new SharedArray('merchant_id', function () {
    return JSON.parse(open('../file/cimb1.json')).merchant_id;
});
export function verify_callback_cimb(scenario) {
    const ref1 = data[scenario.iterationInTest];
    const ref2 = data2[scenario.iterationInTest];
    //console.log(ref1+"  "+ref2);
    const url_verify = 'https://new-ops-clone.inet.co.th/cimb/api/payment/cimb/verifydata/v1';
    const payload_verify = JSON.stringify({
        header: {
            requester_system: "SIBS",
            request_reference_no: "BP202004021536201234543231",
            transaction_datetime: "2025-02-21T09:33:00.000+07:00"
        },
        data: {
            biller_id: "090554900146400",
            reference1: "" + ref1,
            reference2: "" + ref2,
            reference3: "66",
            transaction_id: "REFLOADTEST250210001",
            transaction_datetime: "2025-02-21T09:33:00.000+07:00",
            amount_paid: 1,
            sender_account_name: "AAAA"
        }
    });

    const params_verify = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            "True-Client-Ip": "184.22.188.182",
            "Content-Type": "application/json",
            "Authorization": "Basic Y2ltYnByb21wdHBheTpDMU04b25wcmQ="
        }
    };

    const response_verify = http.post(url_verify, payload_verify, params_verify);
    if (!response_verify || response_verify.error_code || (response_verify.status !== 200 && response_verify.status !== 201)) {
        console.log("Verify Fail!!");
        return response_verify
    }
    check(response_verify, {
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

    //Step 5: Callback
    const url_callback = 'https://new-ops-clone.inet.co.th/cimb/api/payment/cimb/notification/v1';

    const params_callback = {
        timeout: "300s", // หรือใช้ "300000ms" ตามความต้องการ
        headers: {
            'True-Client-Ip': '184.22.188.182',
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04b25wcmQ=', // แทนที่ด้วย Token จริง
        }
    };

    const payload_callback = JSON.stringify({
        header: {
            requester_system: 'SIBS',
            request_reference_no: 'BP202004021536201234543231',
            transaction_datetime: '2025-02-21T09:33:10.000+07:00',
        },
        data: {
            biller_id: '090554900146400',
            reference1: '' + ref1,
            reference2: '' + ref2,
            reference3: '66',
            biller_display_name: '',
            result: 'S',
            transaction_id: 'REFLOADTEST240426001',
            transaction_datetime: '2025-02-21T09:33:10.000+07:00',
            amount_paid: 1,
            sender_account_name: 'AAAA',
        },
    });

    // ใช้ params_callback ในการตั้งค่า timeout และ headers
    const response_callback = http.post(url_callback, payload_callback, params_callback);
    if (!response_callback || response_callback.error_code || (response_callback.status !== 200 && response_callback.status !== 201)) {
        console.log("Callback Fail!!");
        return response_callback
    }
    return response_callback
}