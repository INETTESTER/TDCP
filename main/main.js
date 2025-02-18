//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';

import { oauth_create_qr_verify_cimb } from '../api/oauth_create_qr_verify_cimb.js';
import { oaut_scb } from '../api/oauth_scb.js';
import { inquirypertxn } from '../api/inquirypertxn.js';
import { inquirydate } from '../api/inquirydate.js';
//import { callback_scb } from '../api/callback_scb.js';
import { oauth_create_scb } from '../api/oauth_create_scb.js';
import { oauth_cimb } from '../api/oauth_cimb.js';
import { oauth_create_qr_cimb } from '../api/oauth_create_qr_cimb.js';
import { oauth_create_qr_scb } from '../api/oauth_create_qr_scb.js';
//import { oauth_create_qr_verify_callback_cimb } from '../api/oauth_create_qr_verify_callback_cimb.js';
import { oauth_create_qr_callback_scb } from '../api/oauth_create_qr_callback_scb.js';
import { oauth_bay } from '../api/oauth_bay.js';
import { oauth_create_bay } from '../api/oauth_create_bay.js';
import { oauth_create_qr_bay } from '../api/oauth_create_qr_bay.js';
import { oauth_create_qr_callback_bay } from '../api/oauth_create_qr_callback_bay.js';
import { callback_bay } from '../api/callback_bay.js';
import { oauth_create_inquirypertxn_scb } from '../api/oauth_create_inquirypertxn_scb.js';
import { oauth_create_inquirydate_scb } from '../api/oauth_create_inquirydate_scb.js';


//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  // response = inquirypertxn()                  
  // response = inquirydate()
//=======================SCB==================================
  // response = oaut_scb()
  // response = callback_scb(scenario)
  // response = oauth_create_scb(cid)
  // response = oauth_create_qr_scb()
  // response = oauth_create_inquirypertxn_scb()
  // response = oauth_create_inquirydate_scb()
   response = oauth_create_qr_callback_scb(scenario)
//=======================CIMB=================================
  // response = oauth_cimb()
  // response = oauth_create_qr_cimb()
  // response = oauth_create_qr_verify_cimb()
  // response = oauth_create_qr_verify_callback_cimb()
//=======================BAY=================================
  // response = oauth_bay()
  // response = oauth_create_bay()
  // response = oauth_create_qr_bay()
  // response = oauth_create_qr_callback_bay()
  // response = callback_bay()
  error_check(response);
  sleep(1)
}











































































const cid = __ENV.cid || "1";
const id = __ENV.id || "1";
const projectname = __ENV.projectname || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
let response ;
const scenariox= __ENV.scenariox || "1";
let options;
const vusx = Math.ceil(user / durationx);
if(scenariox==1){
  options = {
    http: {
      timeout: '300s' 
    },
    insecureSkipTLSVerify: true,
      discardResponseBodies: true,
      scenarios: {
        contacts: {
          executor: 'per-vu-iterations',
          vus: vusx,
          iterations: durationx,
          maxDuration: '10m',
          gracefulStop: '120s',
        },
      },
    };
}
else if(scenariox==2){
  options = {
    http: {
      timeout: '300s' 
    },
    insecureSkipTLSVerify: true,
    vus: user, 
    duration: durationx+'s',
    gracefulStop: '120s',
  };
}
else if(scenariox==3){
  options = {
    http: {
      timeout: '300s' 
    },
    insecureSkipTLSVerify: true,
    scenarios: {
      example_scenario: {
        executor: 'constant-arrival-rate',
        rate: vusx*2,
        timeUnit: '2s',
        preAllocatedVUs: user*3,
        maxVUs: user * 3, // ปรับ maxVUs ให้รองรับการโหลดเพิ่ม
        duration: durationx+'s', 
        gracefulStop: '120s',
      },
    },
  };
}
else{
  options = {
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
      },
    },
  };
}
export { options };