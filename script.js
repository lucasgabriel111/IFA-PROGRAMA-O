/* ==========================================================================
   SISTEMA DE ACESSIBILIDADE - JAVASCRIPT EXTERNO (script.js)
   ========================================================================== */

// Variavel global para o controle de fonte
let tamanhoFonteAtual = 1.25; // Tamanho padrão em rem

/**
 * 1. SÍNTESE DE VOZ (Leitor de Página)
 * Utiliza a Web Speech API nativa do navegador para ler o texto em voz alta.
 */
function lerPagina() {
  // Verifica se o navegador suporta a API de voz
  if (!('speechSynthesis' in window)) {
    alert("Seu navegador não suporta a função de leitura de voz.");
    return;
  }

  // Cancela qualquer leitura que já esteja em andamento
  window.speechSynthesis.cancel();

  // Seleciona apenas o conteúdo principal para leitura
  const conteudo = document.getElementById('conteudo-principal');

  if (!conteudo) {
    console.error("Elemento 'conteudo-principal' não encontrado.");
    return;
  }

  // Extrai o texto limpo do conteúdo
  const textoParaLer = conteudo.innerText;

  // Cria o objeto de emissão de fala
  const mensagem = new SpeechSynthesisUtterance(textoParaLer);

  // Configurações da voz
  mensagem.lang = 'pt-BR'; // Idioma em português do Brasil
  mensagem.rate = 1.0;   // Velocidade da fala (0.1 a 10, sendo 1.0 o padrão)
  mensagem.pitch = 1.0;  // Tom da voz (0 a 2)

  // Dispara a leitura
  window.speechSynthesis.speak(mensagem);
}

/**
 * Interruptor para parar a leitura de voz imediatamente.
 */
function pararLeitura() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * 2. ALTO CONTRASTE
 * Alterna a classe 'alto-contraste' no <body> para alterar as variáveis de cor do CSS.
 */
function alternarAltoContraste() {
  document.body.classList.toggle('alto-contraste');
  
  // Salva a preferência do usuário no navegador (LocalStorage)
  const modoAtivo = document.body.classList.contains('alto-contraste');
  localStorage.setItem('altoContraste', modoAtivo ? 'ativo' : 'inativo');
}

/**
 * 3. CONTROLE DE TAMANHO DA FONTE
 * @param {number} fator - Valor positivo (1) para aumentar, negativo (-1) para diminuir.
 */
function alterarTamanhoFonte(fator) {
  // Modifica o tamanho da fonte em incrementos de 0.15rem
  tamanhoFonteAtual += fator * 0.15;

  // Limites mínimo (0.9rem) e máximo (2.2rem) para evitar quebrar o layout
  if (tamanhoFonteAtual < 0.9) tamanhoFonteAtual = 0.9;
  if (tamanhoFonteAtual > 2.2) tamanhoFonteAtual = 2.2;

  // Aplica a alteração diretamente ao estilo do body
  document.body.style.fontSize = tamanhoFonteAtual + 'rem';
}

/**
 * 4. INICIALIZAÇÃO E PREVENÇÃO DE ERROS
 * Executado assim que a página é totalmente carregada.
 */
window.addEventListener('DOMContentLoaded', () => {
  // Restaura a preferência de Alto Contraste salva anteriormente
  const contrasteSalvo = localStorage.getItem('altoContraste');
  if (contrasteSalvo === 'ativo') {
    document.body.classList.add('alto-contraste');
  }
});

// Garante que a leitura de voz pare caso o usuário feche ou atualize a página
window.addEventListener('beforeunload', () => {
  pararLeitura();
});