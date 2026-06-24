const http = require('http');

http.get('http://localhost:3002/subject/math/level/l01', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', res.headers);
    console.log('BODY:', data.substring(0, 1000));
  });
}).on('error', (err) => {
  console.log('Error: ', err.message);
});
