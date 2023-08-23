import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '10m', target: 100 },
        { duration: '5m', target: 0 },
    ],
    tags:{
      test_type:"load"
    }
};


// Define URLs for Server-side Rendered (SSR) and Client-side Rendered (CSR) tests
const ssrUrl = 'https://5qtpyzhmup.eu-west-1.awsapprunner.com/prediction/test';
const csrUrl = 'https://5qtpyzhmup.eu-west-1.awsapprunner.com/';


export default () => {
    // Test Server-side Rendered URL
    const ssrRes = http.get(ssrUrl);
    check(ssrRes, {
      'Server-side Rendered - status is 200': (r) => r.status === 200,
      'Server-side Rendered - correct content': (r) => r.body.includes('Personal Info'),
    });
    sleep(1);
  
    // Test Client-side Rendered URL
    const csrRes = http.get(csrUrl);
    check(csrRes, {
      'Client-side Rendered - status is 200': (r) => r.status === 200,
      'Client-side Rendered - correct content': (r) => r.body.includes('Enter Your Name'),
    });
    sleep(1);
  };
 
  export function handleSummary(data) {
    return {
      "/summary/load_summary_apprunner.html": htmlReport(data),
      '/summary/load_summary_apprunner.json': JSON.stringify(data),
    };
  }  
  
  
  
  