import http from 'k6/http';

export  function create_transaction() {
    const url = 'https://new-ops-clone.inet.co.th/api/v1/payment-transactions/access-token';
    
    const payload = JSON.stringify({ //CIMB
        key: "WQMfmEUDuK7RZtyY0QG/U3sRXQdDtLw591j2cajzZGzj/8PO9LlmGLgpPanCPGQRuFVkwWliuhMmJikWwxj7TuE4iZ+Rkf9lnBMgZnqsPlG6WOXPP3a4p1TyuGrq1QR+UraKNlGH+jhxZ/QOmHyFSuIoyjXR1W4TTOL7X/tJkZk=",
        orderId: "LOADTEST-241113001",
        orderDesc: "LOAD TEST CIMB",
        amount: 1,
        apUrl: "https://www.google.co.th",
        regRef: "", 
        payType: "QR"
    });
    // const payload = JSON.stringify({ //SCB
    //     key: "T1kbWWoJs68MZ+CZAO2NnitijJviGOhmwpHABEHyMTDt9cckRkbis7ssQOHfRyVmc8rKE8iORfW2WnRvCvS6k0Yj4U4uP4mbiu1K2utFeOBJZmX8CdkDt2nHWnDdbQN0UdCwPYhuqr8HW6O/nyuhqKggh0g77DVZvGfZnDIaPRI=",
    //     orderId: "LOADTEST-241113002",
    //     orderDesc: "LOAD TEST SCB",
    //     amount: 1,
    //     apUrl: "https://www.google.co.th",
    //     regRef: "", 
    //     payType: "QR"
    // });
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmUiOjE3MzE5MDYwNTAsImtleSI6IldRTWZtRVVEdUs3Ulp0eVkwUUcvVTNzUlhRZER0THc1OTFqMmNhanpaR3pqLzhQTzlMbG1HTGdwUGFuQ1BHUVJ1RlZrd1dsaXVoTW1KaWtXd3hqN1R1RTRpWitSa2Y5bG5CTWdabnFzUGxHNldPWFBQM2E0cDFUeXVHcnExUVIrVXJhS05sR0gramh4Wi9RT21IeUZTdUlveWpYUjFXNFRUT0w3WC90Smtaaz0iLCJvcmRlcklkIjoiTE9BRFRFU1QtMjQxMTEzMDAxIn0.53CGJAYj5zBy7lIiyMg1CGepmJdOVhhvFenC-MZgAXo'
        }
    };

    const response = http.post(url, payload, params);

    //console.log(response.body);
    return response
}
