import URL from 'url';
import fs from 'fs';
const http = require('http');
const https = require('https');
let formstream = require('formstream');

class Request {
  request(url, method, headers, data) {
    console.log('request url: ', url)
    return new Promise((resolve, reject) => {
      // data = JSON.stringify(data);
      console.log('pstdata: ', data);
      
      url = URL.parse(url);
      console.log('...', url)
      const options = {
        hostname: url.hostname,
        path: url.path,
        method: method,
        port: url.port,
        headers: headers
      };
      console.log('options: ', options)
      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        if(res.statusCode !== 200) {
          reject('Error occurred!')
        }
        res.setEncoding('binary');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData)
          // rawData = JSON.parse(rawData);
            return resolve(rawData);
        });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e)
      });

      // write data to request body
      req.write(data);
      req.end();
    });
  }

  formRequest(url, method, headers, data, cookie, accessToken, filePath) {
    console.log('request url: ', url)
    let form = formstream();
    
    return new Promise((resolve, reject) => {
      form.file('card', filePath, 'test.zip');
      console.log('HEADERS-----------------', form.headers())
      url = URL.parse(url);
      headers['Content-Type'] = form.headers()['Content-Type'];
      const options = {
        hostname: url.hostname,
        path: url.path,
        method: method,
        port: url.port,
        headers: headers
      };
      
      console.log('options-----------------', options)
     
      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        // res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData)
          fs.unlinkSync(filePath);
          return resolve(rawData);
        });
      });
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e)
      });
      form.pipe(req);
    });
  }

  requestSecure(url, method, headers, data) {
    console.log('request url: ', url)
    return new Promise((resolve, reject) => {
      // data = JSON.stringify(data);
      console.log('pstdata: ', data);
      
      url = URL.parse(url);
      console.log('...', url)
      const options = {
        hostname: url.hostname,
        path: url.path,
        method: method,
        port: url.port,
        headers: headers
      };
      console.log('options: ', options)
      const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        if(res.statusCode !== 200) {
          reject('Error occurred!')
        }
        res.setEncoding('utf-8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          console.log(rawData)
          // rawData = JSON.parse(rawData);
            return resolve(rawData);
        });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e)
      });

      // write data to request body
      if (data)
        req.write(data);
      req.end();
    });
  }
}

export default Request;
