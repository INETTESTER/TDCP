import http from 'k6/http';

export function callback_bay() {
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
      'Content-Type': 'application/json'
    }
  };

  const res_qr_callback = http.post(url_qr_callback, payload_qr_callback, params_qr_callback);
  return res_qr_callback;
}
