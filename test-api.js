// Simple test script to verify the contact form API
const testContactAPI = async () => {
  try {
    console.log('Testing Contact Form API...');
    
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+971501234567',
        subject: 'buying',
        message: 'This is a test message to verify the contact form API is working correctly.',
        propertyType: 'villa',
        budget: '2m-5m'
      }),
    });

    const result = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Contact API test PASSED');
    } else {
      console.log('❌ Contact API test FAILED');
    }
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
  }
};

// Test rate limiting
const testRateLimit = async () => {
  try {
    console.log('\nTesting Rate Limiting...');
    
    const promises = [];
    for (let i = 0; i < 7; i++) {
      promises.push(
        fetch('http://localhost:3001/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `Test User ${i}`,
            email: `test${i}@example.com`,
            subject: 'buying',
            message: `Test message ${i}`,
          }),
        })
      );
    }
    
    const responses = await Promise.all(promises);
    
    let rateLimited = false;
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      console.log(`Request ${i + 1}: Status ${response.status}`);
      
      if (response.status === 429) {
        rateLimited = true;
        console.log('✅ Rate limiting is working');
        break;
      }
    }
    
    if (!rateLimited) {
      console.log('⚠️ Rate limiting may not be working as expected');
    }
    
  } catch (error) {
    console.error('❌ Rate Limit Test Error:', error.message);
  }
};

// Test spam protection
const testSpamProtection = async () => {
  try {
    console.log('\nTesting Spam Protection...');
    
    const spamResponse = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Spam User',
        email: 'spam@example.com',
        subject: 'buying',
        message: 'Click here for free money! Visit http://spam.com and http://scam.com for amazing deals!',
        website: 'spam-honeypot-value' // This should trigger honeypot
      }),
    });

    const result = await response.json();
    
    if (spamResponse.status === 400) {
      console.log('✅ Spam protection is working');
    } else {
      console.log('⚠️ Spam protection may not be working as expected');
    }
    
  } catch (error) {
    console.error('❌ Spam Protection Test Error:', error.message);
  }
};

// Run all tests
const runTests = async () => {
  console.log('🚀 Starting JAY Real Estate Contact Form API Tests\n');
  
  await testContactAPI();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  
  await testRateLimit();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  
  await testSpamProtection();
  
  console.log('\n✅ All tests completed!');
};

runTests();
