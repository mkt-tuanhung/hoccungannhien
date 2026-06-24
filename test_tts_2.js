const https = require('https');

const text = "Có 9 con mèo trên màn hình.";
const url = "https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=vi&q=" + encodeURIComponent(text);

https.get(url, {
  headers: {
    "User-Agent": "Mozilla/5.0"
  }
}, (res) => {
  console.log(`Status: ${res.statusCode}`);
}).on('error', (e) => {
  console.error(e);
});
