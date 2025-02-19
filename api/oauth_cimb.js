import http from 'k6/http';

export function oauth_cimb() {
    const url = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
    const orderId = `1${__VU}${__ITER}1`;
    const payload = JSON.stringify({
        key: "WQMfmEUDuK7RZtyY0QG/U3sRXQdDtLw591j2cajzZGzj/8PO9LlmGLgpPanCPGQRuFVkwWliuhMmJikWwxj7TuE4iZ+Rkf9lnBMgZnqsPlG6WOXPP3a4p1TyuGrq1QR+UraKNlGH+jhxZ/QOmHyFSuIoyjXR1W4TTOL7X/tJkZk=",
        orderId: "IMAGE-TEST-QR-CIMB" + orderId
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
