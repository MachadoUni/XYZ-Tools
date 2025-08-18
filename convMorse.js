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