const https = require('https');

const text = "Có 9 con mèo trên màn hình.";
const url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=" + encodeURIComponent(text);

https.get(url, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Referer": "https://translate.google.com/"
  }
}, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (chunk) => process.stdout.write(chunk.toString('utf8')));
}).on('error', (e) => {
  console.error(e);
});
