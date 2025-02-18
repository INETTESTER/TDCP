import http from 'k6/http';
const filename = __ENV.filename || "Hello";
const date = __ENV.date || "Hello";
const id = __ENV.id || "1";
const google_link = __ENV.google_link || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
const projectname = __ENV.projectname || "1";
const reportPath = `../report/${date}/${filename}.json`;
const jsonData = open(reportPath);
export default function() {
    const startIndex = google_link.indexOf('/d/') + 3;
    const endIndex = google_link.indexOf('/edit');
  
  // ดึงรหัสของ Google Sheets ออกมา
    const spreadsheetID = google_link.substring(startIndex, endIndex);
    const data = JSON.parse(jsonData);
    const avgIterationDuration = data.metrics.http_req_duration.avg;
    const minIterationDuration = data.metrics.http_req_duration.min;
    const maxIterationDuration = data.metrics.http_req_duration.max;
    const pnineone = data.metrics.http_req_duration["p(90)"];
    const pninefive = data.metrics.http_req_duration["p(95)"];
    const request = (data.metrics.http_reqs.count);
    const http_reqs_pass = (data.metrics.http_req_failed.passes);
    const tps = (data.metrics.http_reqs.rate).toFixed(2);
    const testtime = Math.ceil(request/tps);
    const avg = (avgIterationDuration/1000).toFixed(2);
    const min = (minIterationDuration/1000).toFixed(2);
    const max = (maxIterationDuration/1000).toFixed(2);
    const p90 = (pnineone/1000).toFixed(2);
    const p95 = (pninefive/1000).toFixed(2);
    const e200 = data.root_group.checks['200 OK'].passes;;
    const e201 = data.root_group.checks['201 Created'].passes;;
    const e400 = data.root_group.checks['400 Bad Request'].passes;;
    const e401 = data.root_group.checks['401 Unauthorized'].passes;;
    const e403 = data.root_group.checks['403 Forbidden'].passes;;
    const e404 = data.root_group.checks['404 Not Found'].passes;;
    const e429 = data.root_group.checks['429 Too Many Requests'].passes;;
    const e500 = data.root_group.checks['500 Internal Server Error'].passes;;
    const e502 = data.root_group.checks['502 Bad Gateway'].passes;;
    const e503 = data.root_group.checks['503 Service Unavailable'].passes;;
    const e504 = data.root_group.checks['504 Gateway Timeout'].passes;;
    const unknown = request - (e200+e201+e400+e401+e403+e404+e429+e500+e502+e503+e504);
    let error = http_reqs_pass;

 
    const now = new Date();
    const startTime = new Date(now.getTime() - (testtime*1000));
    const endTime = new Date(now.getTime());

    console.log("projectname: "+projectname);
    console.log("ID: "+id);
    console.log("==============================");
    console.log(`Request: ${request}`);

      const checks = data.root_group.checks;
      const filteredPasses = Object.keys(checks)
      .filter((key) => checks[key].passes > 0)
      .map((key) => ({
          status: key,
          passes: checks[key].passes
      }));
  
      filteredPasses.forEach((item) => {
        //console.log(`${item.status}: ${item.passes}`);
        if(item.status==="200 OK"||item.status==="201 Created"){
          console.log(`✔️ ${item.status}: ${item.passes}`);
        }
        else{
          console.log(`❌ ${item.status}: ${item.passes}`);
        }
      });
      if (error!=0) {
        if (unknown!=0) {
          console.log("❌ Unknown errors : "+unknown);
        }
        console.log("❌ Number of errors : "+error);
      }


      const sheetDB = 'https://script.google.com/macros/s/AKfycbyOMNksImH823XdyegUl20B16Ed7w3qOitEhd4kSacY3KQQZCbrXW1EGubx0BL3puet/exec?action=insertsummary';
      const payload2 ={
          projectname: projectname,
          request: request,
          date:date,
          start:formatTime(startTime),
          end:formatTime(endTime),
          average: avg,
          min: min,
          max: max,
          p90: p90,
          p95: p95,
          tps: tps,
          error: error,
          id: id,
          e400: e400,
          e401: e401,
          e403: e403,
          e404: e404,
          e429: e429,
          e500: e500,
          e502: e502,
          e503: e503,
          e504: e504,
          eunknow: unknown,
          vus: user,
          duration: durationx
      }
      const params2 = {
          headers: {
            'Content-Type': 'application/json',
          },
      };
      http.post(sheetDB, JSON.stringify(payload2), params2);
      let urlgetdata = 'https://script.google.com/macros/s/AKfycbwoCkOJwYVfCPiSr3_SuLQP3-QscLnXt5fGagCAl94V2ePbiyfHs-qy8mUriB2zPaC0/exec?action=getdata';
      let paramsgetdata = {
          headersgetdata: {
              'Content-Type': 'application/json'
          },
      };
      let payloadgetdata = JSON.stringify({
          projectnames: projectname,
          sheetid: spreadsheetID,
      });
  
      http.post(urlgetdata, payloadgetdata, paramsgetdata);
      console.log("==============================");
      console.log(`Average: ${avg}`);
      console.log(`Min: ${min}`);
      console.log(`Max: ${max}`);
      console.log(`90th: ${p90}`);
      console.log(`95th: ${p95}`);
      console.log(`TPS: ${tps}`);  

}
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}