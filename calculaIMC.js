function configurarCampoAltura(idCampo) {
  const campo = document.getElementById(idCampo);

  campo.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // só dígitos

    if (value.length > 3) {
      value = value.substring(0, 3); // limita a 3 dígitos
    }

    if (value.length > 1) {
      // insere vírgula após o primeiro dígito
      value = value[0] + "," + value.substring(1);
    }

    e.target.value = value;
  });
}

function configurarCampoPeso(idCampo) {
  const campo = document.getElementById(idCampo);

  campo.addEventListener("input", function () {
    let raw = campo.value;

    if (raw.startsWith("0,")) {
      raw = raw.slice(2);
      if (raw.startsWith("0")) {
        raw = raw.slice(1);
      }
    }

    let digits = raw.replace(/\D/g, "");

    if (digits.length > 5) digits = digits.slice(0, 5);

    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length <= 2) {
      formatted = "0," + digits.padStart(2, "0");
    } else {
      formatted = digits.slice(0, -2) + "," + digits.slice(-2);
    }

    campo.value = formatted;
  });
}

configurarCampoAltura('altura');
configurarCampoPeso('peso');

function esconderErro() {
    const erroDiv = document.getElementById("mensagem-erro");
    if (!erroDiv.classList.contains('hidden')) {
        erroDiv.classList.add('hidden');
    }
}

function mostrarErro() {
    const erroDiv = document.getElementById("mensagem-erro");
    erroDiv.classList.remove('hidden');

    var mensagem = '<i class="fas fa-exclamation-circle mr-2"></i>Valores inválidos!';
    erroDiv.innerHTML = `<p class="font-semibold">${mensagem}</p>`;
}

function esconderResultado() {
    const resultadoDiv = document.getElementById("resultado-container");
    if (!resultadoDiv.classList.contains('hidden')) {
        resultadoDiv.classList.add('hidden');
    }
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById("resultado-container");
    resultadoDiv.classList.remove('hidden');

    document.getElementById("resultado").innerHTML = resultado;

}

function calculaIMC() {

    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');

    var peso = pesoInput.value;
    var altura = alturaInput.value;

    peso = String(peso).replace(",", ".");
    altura = String(altura).replace(",", ".");

    peso = Number(peso);
    altura = Number(altura);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        mostrarErro();
        return;
    }

    const imc = peso / (altura * altura);

    mostrarResultado(`${imc.toFixed(2)}`);
}

function limparInput() {
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    esconderErro();
    esconderResultado();
}