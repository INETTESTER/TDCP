import http from 'k6/http';

export  function inquirypertxn() {
    const url = 'https://new-ops-clone.inet.co.th/portal/api/v1/payment-transactions/inquiry-txn';
    
    const payload = JSON.stringify({
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        payment_transaction_no: "P24093012105942"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.post(url, payload, params,{timeout: 300000});

    //console.log(response.body);
    return response
}
