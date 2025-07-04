const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:5000/api/auth';

function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = client.request(requestOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAuth() {
  console.log('Testing Authentication Endpoints...\n');

  // Test 1: Try to signup with existing email
  console.log('1. Testing signup with existing email...');
  try {
    const response = await makeRequest(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'labi44347@gmail.com',
      password: 'testpassword123',
      displayName: 'Test User'
    });
    console.log('Response:', response.data);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n2. Testing signup with new email...');
  try {
    const response = await makeRequest(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'testuser@example.com',
      password: 'testpassword123',
      displayName: 'Test User'
    });
    console.log('Response:', response.data);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n3. Testing login with existing user...');
  try {
    const response = await makeRequest(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'abig123@gmail.com',
      password: 'password123' // You'll need to know the actual password
    });
    console.log('Response:', response.data);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n4. Testing login with invalid credentials...');
  try {
    const response = await makeRequest(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    });
    console.log('Response:', response.data);
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth().catch(console.error); 