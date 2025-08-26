// atualizar o valor do range
  document.getElementById('tamanho').addEventListener('input', function() {
    document.getElementById('tamanho-value').textContent = this.value;
  });
  
function copiarSenha() {
  var output = document.getElementById("senha-output").value;
  const copyButton = document.getElementById("copy-button");

  if (output !== '') {
    navigator.clipboard.writeText(output).then(() => {
      showFloatingTooltip(copyButton, 'Copiado!');
    }).catch((err) => {
      console.error('Falha ao copiar texto: ', err);
      showFloatingTooltip(copyButton, 'Erro ao copiar!');
    });
  } else {
    showFloatingTooltip(copyButton, 'Nada para copiar!');
  }
}

function showFloatingTooltip(button, message) {
  // remove tooltip antigo
  const oldTooltip = document.getElementById('floating-tooltip');
  if (oldTooltip) oldTooltip.remove();

  // cria tooltip
  const tooltip = document.createElement('div');
  tooltip.id = 'floating-tooltip';
  tooltip.textContent = message;
  tooltip.className = 'fixed bg-roxo1 text-white px-3 py-1 rounded-md text-sm shadow-lg opacity-0 transition-opacity duration-300 z-50';

  // pega posição do botão
  const rect = button.getBoundingClientRect();
  tooltip.style.top = `${rect.top - 40}px`;
  tooltip.style.left = `${rect.left + rect.width/2}px`;
  tooltip.style.transform = 'translateX(-50%)';

  document.body.appendChild(tooltip);

  // fade in
  setTimeout(() => {
    tooltip.classList.add("opacity-100");
  }, 10);

  // fade out
  setTimeout(() => {
    tooltip.classList.remove("opacity-100");
    setTimeout(() => tooltip.remove(), 300);
  }, 2000);
}

// liga o botão
document.getElementById("copy-button").addEventListener("click", copiarSenha);

  // script gerar senha
  document.getElementById('generate-button').addEventListener('click', function() {
    const tamanho = document.getElementById('tamanho').value;
    const useMaiusculas = document.getElementById('maiusculas').checked;
    const useMinusculas = document.getElementById('minusculas').checked;
    const useNumeros = document.getElementById('numeros').checked;
    const useSimbolos = document.getElementById('simbolos').checked;
    
    // caracteres
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%&*()_+-=[]{}|;:,.<>?';
    
    let caracteres = '';
    if (useMaiusculas) caracteres += maiusculas;
    if (useMinusculas) caracteres += minusculas;
    if (useNumeros) caracteres += numeros;
    if (useSimbolos) caracteres += simbolos;
    
    if (caracteres === '') {
      alert('Selecione pelo menos uma opção!');
      return;
    }
    
    let senha = '';
    for (let i = 0; i < tamanho; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    document.getElementById('senha-output').value = senha;
  });
