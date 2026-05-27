const dns = require('dns');

// Set DNS to Google's Public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const srvRecord = '_mongodb._tcp.cluster0.3gos7qj.mongodb.net';

console.log(`Attempting to resolve SRV record: ${srvRecord}`);

dns.resolveSrv(srvRecord, (err, addresses) => {
  if (err) {
    console.error('DNS Resolution Error:', err);
    console.log('\n--- Troubleshooting Tips ---');
    console.log('1. Check your internet connection.');
    console.log('2. Ensure your DNS server (e.g., 8.8.8.8) can resolve SRV records.');
    console.log('3. If you are on a school/office network, they might be blocking SRV lookups or port 27017.');
    console.log('4. Try using the "Standard Connection String" (without +srv) from MongoDB Atlas.');
  } else {
    console.log('Successfully resolved SRV addresses:');
    console.log(addresses);
  }
});
