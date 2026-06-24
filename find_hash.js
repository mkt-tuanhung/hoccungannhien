const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const ttsDir = path.join(__dirname, 'public', 'tts');
const files = new Set(fs.readdirSync(ttsDir));

function check(text) {
    const hash = crypto.createHash('md5').update(text).digest('hex');
    if (files.has(hash + '.mp3')) {
        console.log(`FOUND! Text: "${text}" -> Hash: ${hash}`);
        return true;
    }
    return false;
}

const variations = [
    "Có 9 con mèo trên màn hình. Con hãy chọn số đúng.",
    "Có 9 con mèo trên màn hình. Con hãy chọn số đúng",
    "Có 9 con mèo trên màn hình. Con hãy chọn số đúng. ",
    "Có 9 con mèo trên màn hình.  Con hãy chọn số đúng.",
    "co 9 con meo tren man hinh. con hay chon so dung.",
    "Có 9 con mèo",
    "9 con mèo",
    "Có 9 con thỏ trên màn hình. Con hãy chọn số đúng.",
    "Có 9 quả táo trên màn hình. Con hãy chọn số đúng."
];

for (let v of variations) {
    check(v);
    check(v.trim());
    check(v.normalize('NFC'));
    check(v.normalize('NFD'));
}

console.log("Done checking variations.");
