const morseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
  'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
  'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
  'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.',
  ' ': '/', // Espaço é representado por barra
};

const reverseMorseCodeMap = {};
for (const char in morseCodeMap) {
  reverseMorseCodeMap[morseCodeMap[char]] = char;
}

function codificarParaMorse(text) {
  return text.toUpperCase().split('').map(char => {
    return morseCodeMap[char] || '';
  }).join(' ');
}

function decodificarParaMorse(morseText) {
  const words = morseText.split(' / '); // Split words by triple space or defined word separator
  return words.map(word => {
    const chars = word.split(' ');
    return chars.map(morseChar => {
      return reverseMorseCodeMap[morseChar] || ''; // Return empty string if Morse sequence not found
    }).join('');
  }).join(' '); // Join decoded words with a single space
}

function traduzirParaMore() {
  var mensagem = document.getElementById("text-input").value;
  document.getElementById("morse-output").value = codificarParaMorse(mensagem);
  document.getElementById('text-input').value = '';
}

function traduzirParaTexto() {
  var mensagem = document.getElementById("morse-output").value;
  document.getElementById("text-input").value = decodificarParaMorse(mensagem);
  document.getElementById('morse-output').value = '';

}

function copiarTexto() {
  const textInput = document.getElementById('text-input');
  textInput.select();
  document.execCommand('copy');

  const tooltip = document.getElementById('tooltip-text');
  tooltip.textContent = 'Copiado!';
  tooltip.style.opacity = '1';

  setTimeout(() => {
    tooltip.style.opacity = '0';
  }, 2000);
}

function copiarMorse() {
  const morseOutput = document.getElementById('morse-output');
  morseOutput.select();
  document.execCommand('copy');

  const tooltip = document.getElementById('tooltip-morse');
  tooltip.textContent = 'Copiado!';
  tooltip.style.opacity = '1';

  setTimeout(() => {
    tooltip.style.opacity = '0';
  }, 2000);
}

function limparCampos() {
  document.getElementById('text-input').value = '';
  document.getElementById('morse-output').value = '';
}

