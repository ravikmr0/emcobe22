/*
Quick test script for the /api/contact endpoint.
Run this while the dev server is running (default Vite port 5173):

$ node scripts/test-contact.js

Make sure to set environment variables `Mail` and `Mail_App_Password` for sending test email.
*/

let fetcher = null;
async function getFetch() {
  if (globalThis.fetch) return globalThis.fetch;
  if (fetcher) return fetcher;
  try {
    const nodeFetch = await import('node-fetch');
    fetcher = nodeFetch.default || nodeFetch;
    return fetcher;
  } catch (e) {
    throw new Error('No fetch available (Node 18+), please install node-fetch or update Node.');
  }
}

async function run() {
  const url = 'http://localhost:5173/api/contact';
  const body = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '1234567890',
    company: 'TestCo',
    message: 'This is a test message from the test script.'
  };

  try {
    const fetch = await getFetch();
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const contentType = res.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    console.log('Status:', res.status, res.statusText);
    console.log('Response:', data);
  } catch (err) {
    console.error('Request failed:', err);
  }
}

run();
