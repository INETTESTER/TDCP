//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';

// import { oaut_scb } from '../api/oauth_scb.js';
// import { create_transaction } from '../api/create_transaction.js';
// import { inquirypertxn } from '../api/inquirypertxn.js';
// import { inquirydate } from '../api/inquirydate.js';
// import { qr_cimb } from '../api/qr_cimb.js';
// import { callback_cimb } from '../api/callback_cimb.js';
// import { qr_scb } from '../api/qr_scb.js';
// import { callback_scb } from '../api/callback_scb.js';
// import { cimb_case } from '../api/cimb_case.js';
// import { oauth_create_qr_callback_scb } from '../api/oauth_create_qr_callback_scb.js';
// import { oauth_create_scb } from '../api/oauth_create_scb.js';
// import { oauth_create_callback_scb } from '../api/oauth_create_callback_scb.js';
// import { oauth_create_cimb } from '../api/oauth_create_cimb.js';
// import { oauth_create_callback_cimb } from '../api/oauth_create_callback_cimb.js';
// import { oauth_cimb } from '../api/oauth_cimb.js';
 import { oauth_create_qr_cimb } from '../api/oauth_create_qr_cimb.js';
// import { oauth_create_qr_scb } from '../api/oauth_create_qr_scb.js';
// import { oauth_create_inquirypertxn_scb } from '../api/oauth_create_inquirypertxn_scb.js';
// import { oauth_create_inquirydate_scb } from '../api/oauth_create_inquirydate_scb.js';


//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  //response = create_transaction()
  //response = inquirypertxn()
  //response = inquirydate()
  //response = cimb_case()
  //response = oauth_create_qr_callback_scb()
//=======================SCB==================================
  //response = oaut_scb()
  //response = callback_scb(scenario)
  //response = qr_scb()
  //response = oauth_create_scb()
  //response = oauth_create_callback_scb(scenario)
  //response = oauth_create_qr_scb()
  //response = oauth_create_inquirypertxn_scb()
  //response = oauth_create_inquirydate_scb()
//=======================CIMB=================================
  //response = oauth_cimb()
  //response = callback_cimb(scenario)
  //response = qr_cimb()
  //response = oauth_create_cimb()
  //response = oauth_create_callback_cimb(scenario)
  response = oauth_create_qr_cimb()


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
        // rate: user,
        // timeUnit: durationx+'s',
        rate: vusx,
        timeUnit: '1s',
        preAllocatedVUs: user,
        duration: durationx+'s', // ระบุระยะเวลาที่ต้องการให้ทดสอบ
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