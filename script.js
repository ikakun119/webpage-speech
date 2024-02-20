document.getElementById('fileInput').addEventListener('change', handleFileSelect);

let speechSynthesisUtterance;
let currentVoiceType = 'default';

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

function stopReading() {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
}

function readText(text) {
    if (text) {
        if (speechSynthesisUtterance && speechSynthesisUtterance.speaking) {
            stopReading();
        }

        const speechSynthesis = window.speechSynthesis;
        const paragraphs = text.split('\n\n'); // パラグラフごとに分割

        paragraphs.forEach(paragraph => {
            const voiceType = getVoiceType(paragraph);
            const content = getContent(paragraph);
            
            speechSynthesisUtterance = new SpeechSynthesisUtterance(content);
            speechSynthesisUtterance.voice = getVoiceByType(voiceType);
            speechSynthesis.speak(speechSynthesisUtterance);
        });
    }
}

function stopReading() {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
}

function getVoiceType(paragraph) {
    // キーワードやタグを含む場合に、それに基づいて声の種類を返す
    if (paragraph.includes('[I]')) {
        return 'interviewer';
    } else if (paragraph.includes('[R]')) {
        return 'respondent';
    } else {
        return 'default';
    }
}

function getContent(paragraph) {
    // キーワードやタグを除外したコンテンツを返す
    return paragraph.replace(/\[.*?\]/g, '').trim();
}

function getVoiceByType(voiceType) {
    const speechSynthesis = window.speechSynthesis;
    const voices = speechSynthesis.getVoices();
    return voices.find(voice => voice.name.includes(voiceType)) || voices[0];
}
