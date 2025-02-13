import http from 'k6/http';

export  function oauth_bay() {
  let url_token = 'https://new-ops-clone.inet.co.th/oauth/api/v1/oauth-token';
  let headers_token = {
    'Content-Type': 'application/json',
  };
  let payload_token = JSON.stringify({
    key: 'cQkSVpaRegca85zVwUnqrLfiJE6FmfZBL3Q2VmldoCa2xzoh6l65g5qtjEwWDTuUHtJA02WO5wlVndXPu2R7wfuSK89B4iFFNGNm397P4FqTgrfa2nai2uogUahclyqWxsDZFvN8bkow4HewrKb92Z49WbZmcYL3wp7vRVgVhvo=',
    orderId: 'LOADTEST-20250213-BAY',
  });

  let res_token = http.post(url_token, payload_token, { headers: headers_token });
  return res_token
}
