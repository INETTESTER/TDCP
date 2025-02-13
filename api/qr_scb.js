import http from 'k6/http';

export  function qr_scb() {
    const url = 'https://new-ops-clone.inet.co.th/scb/api/v1/payment/qr';
    const payload = JSON.stringify({
        accessToken: "AFyUdN7UC4QT5mUtyQOMuDgXGxIAOZonluw0GyMKmzq2ddMm787U2OIpP66m8nzkjZGpg+80WYKXbUnSRB7lojnpCexuPxvdy9KAtt45Msii+jHZnofeRT/i7FK9HvWJqPrt5e7IE5weIOKa+QZtndumXpayXM/VhHLYNq9f1CJYY1Rp1cRV5+FBuP5VycUnDpHZSntd6XF+F1EeULq850WGnIcL0+xQHG9uPFSO3mL41vOBEgoTydH3zjbuoasz2reqmVatSb5+Ot1YbpwBbZ76QnHq05hh5qBQ5HXP08aQYsKQS+avnJdUiEWhtw4UzZ9aPULfMk6siE5pAm32oA=="
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const response = http.post(url, payload, params,{timeout: 300000});

    //console.log(response.body);
    return response
}
