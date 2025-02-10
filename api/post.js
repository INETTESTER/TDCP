import http from 'k6/http';
import { SharedArray } from 'k6/data';

const data = new SharedArray('cid', function () {
    return JSON.parse(open('../file/data.json')).cid;
});

export  function post(scenario) {
  const cid = data[scenario.iterationInTest];
  const url = 'https://script.google.com/macros/s/AKfycby4fyKF1McIlFpx9XwpZrqvMxp5RCAoImSOabzecjytIO6k34vekqfJmr25NJ1R8ziB/exec';
  const payload = JSON.stringify({
    name: 'Champ',
    cid: cid,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '5m',  // ตั้งค่า timeout เป็น 5 นาที
  };

  // ส่งคำขอ POST
  const res = http.post(url, payload, params);
  return res
}
