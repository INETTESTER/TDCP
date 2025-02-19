import http from 'k6/http';

import { SharedArray } from 'k6/data';
const data = new SharedArray('payment_transaction_no', function () {
    return JSON.parse(open('../file/1.json')).payment_transaction_no;
});
const data2 = new SharedArray('merchant_id', function () {
    return JSON.parse(open('../file/1.json')).merchant_id;
});
const data3 = new SharedArray('amount', function () {
    return JSON.parse(open('../file/1.json')).amount;
});

export function callback_scb(scenario) {
    const payment_transaction_no = data[scenario.iterationInTest];
    const merchant_id = data2[scenario.iterationInTest];
    const amount = data3[scenario.iterationInTest]
    const billPaymentRef3 = `${__VU}${__ITER}5`;
    const url = 'https://new-ops-clone.inet.co.th/scb/api/v1/payment/qr-callback';

    const payload = JSON.stringify({
        amount: "" + amount,
        billPaymentRef1: "" + payment_transaction_no,
        billPaymentRef2: "" + merchant_id,
        billPaymentRef3: "NJBP" + billPaymentRef3,
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
        transactionId: "LOADTEST" + billPaymentRef3,
        transactionType: "Domestic Transfers"
    });

    const params = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json',
            'Cookie': '__cf_bm=OB.Eb3YiVk4qS8fCnJpg4vIA6Tn_8oZLo3jQvwxCz9s-1711509545-1.0.1.1-YVef23500PEE1PxfAJHO7Ke_mV7z1jJksp58_U_SbozddU04PxHw_aVgc55uP4qNBzHoeck43EnSAWa_KJkv9g; __cfruid=b569a32fdc9e1d3c4d318e9ea9540b4c361bf28e-1711509545'
        }
    };

    const response = http.post(url, payload, params);

    //console.log(response.body);
    return response
}
