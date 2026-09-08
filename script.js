// Seleção dos elementos da página
const btnRead = document.getElementById('btn-read');
const btnStop = document.getElementById('btn-stop');
const btnContrast = document.getElementById('btn-contrast');
const audioStatus = document.getElementById('audio-status');

let synth = window.speechSynthesis;
let utterance = null;

// Função para extrair e ler o texto estruturado da página
btnRead.addEventListener('click', () => {
    // Se já estiver lendo algo, para a leitura anterior antes de reiniciar
    if (synth.speaking) {
        synth.cancel();
    }

    // Captura o texto apenas do conteúdo principal para evitar ler botões repetitivos
    const textToRead = document.getElementById('main-content').innerText;
    
    utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR'; // Define o idioma para português brasileiro
    utterance.rate = 1.0;     // Velocidade normal da fala

    // Eventos para controle de interface visual e feedbacks de áudio
    utterance.onstart = () => {
        btnRead.style.display = 'none';
        btnStop.style.display = 'inline-block';
        audioStatus.textContent = "O áudio da página está sendo reproduzido."; // Alerta para deficientes auditivos
    };

    utterance.onend = () => {
        resetAudioButtons();
    };

    utterance.onerror = () => {
        resetAudioButtons();
    };

    // Executa a leitura de voz
    synth.speak(utterance);
});

// Função para parar a reprodução de voz
btnStop.addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
    }
    resetAudioButtons();
});

function resetAudioButtons() {
    btnRead.style.display = 'inline-block';
    btnStop.style.display = 'none';
    audioStatus.textContent = "Leitura de áudio finalizada.";
}

// Funcionalidade do botão de Alto Contraste
btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});
