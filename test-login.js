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

async function testLoginAndUserData() {
  console.log('Testing Login and User Data Fetching...\n');

  // Step 1: Login with test user
  console.log('1. Logging in with test user...');
  let token = null;
  try {
    const loginResponse = await makeRequest(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'testuser@example.com',
      password: 'testpassword123'
    });
    
    console.log('Login Response:', loginResponse.data);
    console.log('Login Status:', loginResponse.status);
    
    if (loginResponse.status === 200 && loginResponse.data.success) {
      token = loginResponse.data.token;
      console.log('✅ Login successful! Token received.');
    } else {
      console.log('❌ Login failed!');
      return;
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    return;
  }

  // Step 2: Fetch user data with token
  console.log('\n2. Fetching user data with token...');
  try {
    const userResponse = await makeRequest(`${BASE_URL}/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('User Data Response:', userResponse.data);
    console.log('User Data Status:', userResponse.status);
    
    if (userResponse.status === 200) {
      console.log('✅ User data fetched successfully!');
      console.log('User email:', userResponse.data.email);
      console.log('User role:', userResponse.data.role);
      console.log('Display name:', userResponse.data.displayName);
    } else {
      console.log('❌ Failed to fetch user data!');
    }
  } catch (error) {
    console.error('❌ User data fetch error:', error.message);
  }

  // Step 3: Test invalid token
  console.log('\n3. Testing with invalid token...');
  try {
    const invalidResponse = await makeRequest(`${BASE_URL}/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid_token_here'
      }
    });
    
    console.log('Invalid Token Response:', invalidResponse.data);
    console.log('Invalid Token Status:', invalidResponse.status);
    
    if (invalidResponse.status === 401) {
      console.log('✅ Correctly rejected invalid token!');
    } else {
      console.log('❌ Should have rejected invalid token!');
    }
  } catch (error) {
    console.error('❌ Invalid token test error:', error.message);
  }
}

testLoginAndUserData().catch(console.error); 