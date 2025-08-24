function configurarCampoDecimal(idCampo) {
    const campo = document.getElementById(idCampo);

    campo.addEventListener('input', function (e) {
        let value = e.target.value;

        value = value.replace(/\./g, ',');

        value = value.replace(/[^0-9,]/g, '');

        const partes = value.split(',');
        if (partes.length > 2) {
            value = partes[0] + ',' + partes.slice(1).join('').replace(/,/g, '');
        }

        e.target.value = value;
    });

    campo.addEventListener('keypress', function (e) {
        const char = String.fromCharCode(e.which);

        if (char === '.' || char === ',') {
            e.preventDefault();

            const hasComma = campo.value.includes(',');
            if (!hasComma) {
                const start = campo.selectionStart;
                const end = campo.selectionEnd;

                const newValue = campo.value.substring(0, start) + ',' + campo.value.substring(end);
                campo.value = newValue;
                campo.setSelectionRange(start + 1, start + 1);
            }
            return;
        }

        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });
}

configurarCampoDecimal('altura');
configurarCampoDecimal('peso');

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