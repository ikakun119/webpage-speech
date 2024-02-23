let speechSynthesisUtterance;

document.getElementById('fileInput').addEventListener('change', function(event) {
    handleFileSelect(event);
});

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
    lines.forEach((line, index) => {
        const hashCount = countHashes(line);
        const cleanText = removeHashes(line);
        readText(cleanText, hashCount, index);
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

function readText(text, hashCount, index) {
    if (text) {
        if (speechSynthesisUtterance && speechSynthesisUtterance.speaking) {
            stopReading();
        }

        speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
        speechSynthesisUtterance.rate = 1.7;

        if (hashCount === 1) {
            speechSynthesisUtterance.pitch = -2;
        } else if (hashCount === 2) {
            speechSynthesisUtterance.pitch = -1.0;
        } else if (hashCount === 3) {
            speechSynthesisUtterance.pitch = 1.0;
        } else if (hashCount === 4) {
            speechSynthesisUtterance.pitch = 1.3;
        } else if (hashCount === 5) {
            speechSynthesisUtterance.pitch = 1.7;
        }

        // ユーザーの明示的な操作で音声を再生
        document.addEventListener('click', function clickHandler() {
            const speechSynthesis = window.speechSynthesis;
            speechSynthesis.speak(speechSynthesisUtterance);

            // イベントリスナーを削除
            document.removeEventListener('click', clickHandler);
        });
    }
}

function stopReading() {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
}
