const htmlElement = document.documentElement;
let currentSize = 110; // Percentual inicial da fonte (definido no CSS)

document.getElementById('btn-increase').addEventListener('click', () => {
    if (currentSize < 160) { // Limite máximo de aumento (160%)
        currentSize += 10;
        htmlElement.style.fontSize = currentSize + '%';
    }
});

document.getElementById('btn-decrease').addEventListener('click', () => {
    if (currentSize > 90) { // Limite mínimo de diminuição (90%)
        currentSize -= 10;
        htmlElement.style.fontSize = currentSize + '%';
    }
});

// --- CONTROLE DE ALTO CONTRASTE ---
document.getElementById('btn-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- CONTROLE DE LEITURA DE TEXTO (VOZ) ---
const btnRead = document.getElementById('btn-read');
const btnStop = document.getElementById('btn-stop');
const audioStatus = document.getElementById('audio-status');

let synth = window.speechSynthesis;
let utterance = null;

btnRead.addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }

    // Captura o texto do cabeçalho e do conteúdo principal
    const headerText = document.getElementById('main-title').innerText;
    const bodyText = document.getElementById('main-content').innerText;
    const fullText = headerText + ". " + bodyText;

    utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0; // Velocidade da fala

    // Atualiza a tela quando o áudio começa
    utterance.onstart = () => {
        btnRead.style.display = 'none';
        btnStop.style.display = 'inline-block';
        // Feedback visual/textual imediato (essencial para acessibilidade auditiva)
        audioStatus.textContent = "O reprodutor de voz do site está ativo.";
    };

    // Reseta quando o áudio termina
    utterance.onend = () => { resetAudioSystem(); };
    utterance.onerror = () => { resetAudioSystem(); };

    synth.speak(utterance);
});

btnStop.addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }
    resetAudioSystem();
});

function resetAudioSystem() {
    btnRead.style.display = 'inline-block';
    btnStop.style.display = 'none';
    audioStatus.textContent = "O áudio do site foi finalizado.";
}