function copiarOutput() {
  var output = document.getElementById("cpf-output").value;
  const copyButton = document.getElementById("copiar-interno");

  if (output !== '') {
    try {
      navigator.clipboard.writeText(output);
      showFloatingTooltip(copyButton, 'Copiado!');
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
      showFloatingTooltip(copyButton, 'Erro ao copiar!');
    }
  } else {
    showFloatingTooltip(copyButton, 'Nada para copiar!');
  }
}

function showFloatingTooltip(button, message) {
  const oldTooltip = document.getElementById('floating-tooltip');
  if (oldTooltip) oldTooltip.remove();
  
  const tooltip = document.createElement('div');
  tooltip.id = 'floating-tooltip';
  tooltip.textContent = message;
  tooltip.className = 'absolute bg-roxo1 text-white px-3 py-1 rounded-md text-sm z-10';
  
  const rect = button.getBoundingClientRect();
  tooltip.style.top = `${rect.top - 35}px`;
  tooltip.style.left = `${rect.left + rect.width/2 - 30}px`;
  
  document.body.appendChild(tooltip);
  
  setTimeout(() => {
    tooltip.remove();
  }, 2000);
}

function gerarCpf() {

  cpfOutput = document.getElementById("cpf-output");

  const num1 = aleatorio();
  const num2 = aleatorio();
  const num3 = aleatorio();
  const dig1 = dig(num1, num2, num3);
  const dig2 = dig(num1, num2, num3, dig1);

  cpfOutput.value = `${num1}.${num2}.${num3}-${dig1}${dig2}`;
}

function dig(n1, n2, n3, n4) {
  const nums = n1.split("").concat(n2.split(""), n3.split(""));
  if (n4 !== undefined) {
    nums[9] = n4;
  }

  let x = 0;
  for (let i = (n4 !== undefined ? 11 : 10), j = 0; i >= 2; i--, j++) {
    x += parseInt(nums[j]) * i;
  }

  const y = x % 11;
  return y < 2 ? 0 : 11 - y;
}

function aleatorio() {
  const aleat = Math.floor(Math.random() * 999);
  return ("" + aleat).padStart(3, '0');
}