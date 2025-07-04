const https = require('https');
const http = require('http');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testCartAPI() {
  try {
    console.log('Testing cart API...');
    
    // First, get a song ID
    const songsResponse = await makeRequest('http://localhost:5000/api/songs/trending?limit=1');
    console.log('Songs response status:', songsResponse.status);
    
    if (songsResponse.status !== 200 || !songsResponse.data.success || !songsResponse.data.data.length) {
      console.error('No songs found');
      return;
    }
    
    const songId = songsResponse.data.data[0]._id;
    console.log('Using song ID:', songId);
    
    // Test adding to cart
    const cartResponse = await makeRequest('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackId: songId })
    });
    
    console.log('Cart response status:', cartResponse.status);
    console.log('Cart response:', cartResponse.data);
    
  } catch (error) {
    console.error('Error testing cart API:', error);
  }
}

testCartAPI(); 