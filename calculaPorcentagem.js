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

configurarCampoDecimal('valor');
configurarCampoDecimal('porcentagem');

function limparInput() {
    var inputPorcentagem = document.getElementById("porcentagem");
    var inputValor = document.getElementById("valor");

    inputPorcentagem.value = '';
    inputValor.value = '';

    esconderErro();
    esconderResultado();
}

function calculaPorcentagem() {
    esconderErro();
    esconderResultado();

    var porcentagem = document.getElementById("porcentagem").value;
    var valor = document.getElementById("valor").value;
    var resultado;

    porcentagem = String(porcentagem).replace(",", ".");
    valor = String(valor).replace(",", ".");

    porcentagem = Number(porcentagem);
    valor = Number(valor);

    if (isNaN(porcentagem) || isNaN(valor) || porcentagem == '' || valor == '') {
        mostrarErro();
        return;
    }

    resultado = (porcentagem / 100) * valor;
    mostrarResultado(resultado);
}

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

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
    event.preventDefault();
    calculaPorcentagem();
    }
});