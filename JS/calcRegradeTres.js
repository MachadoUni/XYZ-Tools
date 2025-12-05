document.addEventListener("DOMContentLoaded", () => {
  
  const campoA = document.getElementById("A");
  const campoB = document.getElementById("B");
  const campoC = document.getElementById("C");
  const campoX = document.getElementById("X");

  const btnCalcular = document.getElementById("btnCalcular");
  const btnLimpar = document.getElementById("btnLimpar");

  const resultadoContainer = document.getElementById("resultado-container");
  const resultadoFinal = document.getElementById("resultadoFinal");

  const erroBox = document.getElementById("erro");
  const mensagemErro = document.getElementById("mensagemErro");

  function parseValor(valor) {
    if (!valor) return NaN;
    return parseFloat(valor.replace(",", "."));
  }

  function formatarResultado(num) {
    return Number(num.toFixed(6))     
      .toString()
      .replace(".", ",");             
  }

  function mostrarErro(msg) {
    erroBox.classList.remove("hidden");
    mensagemErro.textContent = msg;
    resultadoContainer.classList.add("hidden");
  }

  function limparErro() {
    erroBox.classList.add("hidden");
    mensagemErro.textContent = "";
  }


  btnCalcular.addEventListener("click", () => {
    limparErro();

    const A = parseValor(campoA.value);
    const B = parseValor(campoB.value);
    const C = parseValor(campoC.value);

    if (isNaN(A) || isNaN(B) || isNaN(C)) {
      mostrarErro("Preencha todos os valores corretamente.");
      return;
    }

    if (B === 0) {
      mostrarErro("O valor de B não pode ser zero.");
      return;
    }

    const X = (B * C) / A;

    if (isNaN(X) || !isFinite(X)) {
      mostrarErro("Não foi possível calcular. Verifique os valores.");
      return;
    }

    const resultadoFormatado = formatarResultado(X);

    campoX.value = resultadoFormatado;
    resultadoFinal.textContent = resultadoFormatado;
    resultadoContainer.classList.remove("hidden");
  });


  btnLimpar.addEventListener("click", () => {
    campoA.value = "";
    campoB.value = "";
    campoC.value = "";
    campoX.value = "";

    resultadoContainer.classList.add("hidden");
    limparErro();
  });

});