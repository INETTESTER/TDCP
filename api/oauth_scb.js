import http from 'k6/http';

export function oaut_scb() {
    const url = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `2${__VU}${__ITER}2`;
    const payload = JSON.stringify({  //SCB
        key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
        orderId: "IMAGE-TEST-QR-SCB"+orderId
    });
    const params = {
        timeout: "300s", // หรือ "300000ms"
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.post(url, payload, params);
    //console.log(response.body);
    return response
}
