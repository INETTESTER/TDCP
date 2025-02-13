import http from 'k6/http';
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


export  function callback_cimb(scenario) {
    const payment_transaction_no = data[scenario.iterationInTest];
    const merchant_id = data2[scenario.iterationInTest];
    const amount = data3[scenario.iterationInTest]
    const url = 'https://new-ops-clone.inet.co.th/cimb/api/:partner/payment/cimb/notification/v1';
    const payload = JSON.stringify({
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

    const params = {
        headers: {
            'True-Client-Ip': '184.22.188.182',
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2ltYnByb21wdHBheTpDMU04b25wcmQ='
        }
    };

    const response = http.post(url, payload, params);

    //console.log(response.body);
    return response
}
