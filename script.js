document.getElementById('fileInput').addEventListener('change', handleFileSelect);

let speechSynthesisUtterance;
let isReadingEnabled = true;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            parseAndReadText(text);
        };
        reader.readAsText(file);
    }
}

function parseAndReadText(text) {
    const lines = text.split('\n');
    lines.forEach(line => {
        const hashCount = countHashes(line);
        readText(line, hashCount);
    });
}

function countHashes(line) {
    let count = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '#') {
            count++;
        } else {
            break;
        }
    }
    return count;
}

function readText(text, hashCount) {
    if (text && isReadingEnabled) {
        if (speechSynthesisUtterance && speechSynthesisUtterance.speaking) {
            stopReading();
        }

        const speechSynthesis = window.speechSynthesis;
        speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
        speechSynthesisUtterance.rate = 1.7;

        // ハッシュの数に応じて声のスタイルを変更
        if (hashCount === 1) {
            speechSynthesisUtterance.pitch = -2; // 速く
        } else if (hashCount === 2) {
            speechSynthesisUtterance.pitch = -1.0; // 大きく
        } else if (hashCount === 3) {
            speechSynthesisUtterance.pitch = 1.0; // 高く
        } else if (hashCount === 4) {
            speechSynthesisUtterance.pitch = 1.3; // 速く
        } else if (hashCount === 5) {
            speechSynthesisUtterance.pitch = 1.7; // 大きく
        }

        speechSynthesis.speak(speechSynthesisUtterance);
    }
}

function stopReading() {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
}

function toggleReadAloud() {
    isReadingEnabled = !isReadingEnabled;
    if (!isReadingEnabled) {
        stopReading();
    }
}
