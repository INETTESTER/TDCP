import http from 'k6/http';

export function oauth_bay() {
  const url_token = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
  
  const headers_token = {
    'Content-Type': 'application/json',
  };

  const payload_token = JSON.stringify({
    key: 'cQkSVpaRegca85zVwUnqrLfiJE6FmfZBL3Q2VmldoCa2xzoh6l65g5qtjEwWDTuUHtJA02WO5wlVndXPu2R7wfuSK89B4iFFNGNm397P4FqTgrfa2nai2uogUahclyqWxsDZFvN8bkow4HewrKb92Z49WbZmcYL3wp7vRVgVhvo=',
    orderId: 'LOADTEST-20250213-BAY',
  });

  const params_token = {
    timeout: "300s", // หรือ "300000ms"
    headers: headers_token
  };

  const res_token = http.post(url_token, payload_token, params_token);
  return res_token;
}
