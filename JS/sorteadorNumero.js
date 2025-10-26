function configurarCampo(idCampo) {
    let campo = document.getElementById(idCampo);

    campo.addEventListener('keypress', function (e) {
        const char = String.fromCharCode(e.which);

        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });
}

configurarCampo("min");
configurarCampo("max");

function limparInput() {
    esconderErro();
    esconderResultado();
    document.getElementById("min").value = '';
    document.getElementById("max").value = '';
}

function sortearNumero() {
    var numero
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;

    if (isNaN(min) || isNaN(max) || min == '' || max == '' || parseInt(min) > parseInt(max)) {
        esconderResultado();
        mostrarErro();
        return;
    }

    min = parseInt(min);
    max = parseInt(max);
    numero = Math.random() * (max - min) + min;
    console.log(numero);
    mostrarResultado(Math.round(numero));
}

function mostrarErro() {
    const erroDiv = document.getElementById("mensagem-erro");
    erroDiv.classList.remove('hidden');

    var mensagem = '<i class="fas fa-exclamation-circle mr-2"></i>Valores inválidos!';
    erroDiv.innerHTML = `<p class="font-semibold">${mensagem}</p>`;
}

function esconderErro() {
    const erroDiv = document.getElementById("mensagem-erro");
    if (!erroDiv.classList.contains('hidden')) {
        erroDiv.classList.add('hidden');
    }
}

function esconderResultado() {
    const resultadoDiv = document.getElementById("resultado-container");
    if (!resultadoDiv.classList.contains('hidden')) {
        resultadoDiv.classList.add('hidden');
    }
}

function mostrarResultado(numero) {
    let resContainerDiv = document.getElementById("resultado-container");
    let resultadoDiv = document.getElementById("resultado");
    esconderErro();
    resContainerDiv.classList.remove('hidden');
    resultadoDiv.textContent = numero;

}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        sortearNumero(); 
    }
});