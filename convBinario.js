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