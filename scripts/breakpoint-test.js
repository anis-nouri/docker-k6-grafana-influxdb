import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    // Key configurations for breakpoint in this section
    executor: 'ramping-arrival-rate', //Assure load increase if the system slows
    stages: [
      { duration: '20m', target: 50000 }, // just slowly ramp-up to a HUGE load
    ],
    tags:{
        test_type:"breakpoint"
      }
  };


// Define URLs for Server-side Rendered (SSR) and Client-side Rendered (CSR) tests
const ssrUrl = 'https://main.d341vd73tlccoe.amplifyapp.com/prediction/test';
const csrUrl = 'https://main.d341vd73tlccoe.amplifyapp.com/';


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
 
  
  
  
  