import http from 'k6/http';
import { SharedArray } from 'k6/data';
export function ran2() {
    let url = 'https://www.ran-demon.com/';
    let res = http.get(url);
    return res
}
const data = new SharedArray('users', function () {
    return JSON.parse(open('../file/cid.json')).BankRef;
  });

export function getCSV(scenario) {
  const user = data[scenario.iterationInTest];
  console.log(`user: ${JSON.stringify(user)}`);
}