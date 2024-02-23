document.getElementById('fileInput').addEventListener('change', handleFileSelect);

let speechSynthesisUtterance;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            parseAndDisplayText(text);
        };
        reader.readAsText(file);
    }
}

function parseAndDisplayText(text) {
    const lines = text.split('\n');
    lines.forEach(line => {
        const hashCount = countHashes(line);
        const cleanText = removeHashes(line);
        displayText(cleanText, hashCount);
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

function removeHashes(line) {
    return line.replace(/#/g, '').trim();
}

function displayText(text, hashCount) {
    const displayArea = document.getElementById('output');
    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    paragraph.addEventListener('click', function () {
        // テキストを読み上げ
        readText(text, hashCount);
    });

    displayArea.appendChild(paragraph);
}

function readText(text, hashCount) {
    if (text) {
        if (speechSynthesisUtterance && speechSynthesisUtterance.speaking) {
            stopReading();
        }

        const speechSynthesis = window.speechSynthesis;
        speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
        speechSynthesisUtterance.rate = 1.7;

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
