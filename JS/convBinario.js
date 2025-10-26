function copiarTexto() {
  const textInput = document.getElementById('text-input');
  textInput.select();
  document.execCommand('copy');

  const tooltip = document.getElementById('tooltip-text');
  tooltip.textContent = "Copiado!";
  tooltip.style.opacity = '1';

  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => tooltip.textContent = "Copiar", 200);
  }, 2000);
}

function copiarBinario() {
  const binaryOutput = document.getElementById('binary-output');
  binaryOutput.select();
  document.execCommand('copy');

  const tooltip = document.getElementById('tooltip-binary');
  tooltip.textContent = "Copiado!";
  tooltip.style.opacity = '1';

  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => tooltip.textContent = "Copiar", 200);
  }, 2000);
}

function limparCampos() {
  document.getElementById('text-input').value = '';
  document.getElementById('binary-output').value = '';
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
  document.documentElement.classList.toggle('dark');
});

function traduzirTextoParaBinario() {
  var mensagem = document.getElementById("text-input").value;

  let resultadoBinario = '';

  for (let i = 0; i < mensagem.length; i++) {
    const codigoAscii = mensagem.charCodeAt(i);

    const binario = codigoAscii.toString(2);

    const binarioComOitoBits = binario.padStart(8, '0');

    resultadoBinario += binarioComOitoBits + ' ';
  }

    document.getElementById('text-input').value = '';
    document.getElementById("binary-output").value = resultadoBinario.slice(0, -1);
}

function traduzirBinarioParaTexto() {
  var mensagem = document.getElementById("binary-output").value;

  const binaryChunks = mensagem.split(' ');

  const text = binaryChunks
    .map(chunk => parseInt(chunk, 2))
    .map(decimal => String.fromCharCode(decimal))
    .join('');

    document.getElementById('binary-output').value = '';
    document.getElementById("text-input").value = text;
} 