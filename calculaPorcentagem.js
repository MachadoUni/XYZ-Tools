function limparInput(){
    var inputPorcentagem = document.getElementById("porcentagem");
    var inputValor = document.getElementById("valor");

    inputPorcentagem.value = '';
    inputValor.value = '';

    esconderErro();
    esconderResultado();
}

function calculaPorcentagem(){
    esconderErro();
    esconderResultado();

    var porcentagem = document.getElementById("porcentagem").value;
    var valor = document.getElementById("valor").value;
    var resultado;

    porcentagem = String(porcentagem).replace(",", ".");
    valor = String(valor).replace(",", ".");

    porcentagem = Number(porcentagem);
    valor = Number(valor);
    console.log(valor);

    // var porcentagem = Number(porcentagemStr);
    // var valor = Number(valorStr);

    if (isNaN(porcentagem) || isNaN(valor) || porcentagem == '' || valor == ''){
        mostrarErro();
        return;
    }

    resultado = (porcentagem / 100) * valor;
    mostrarResultado(resultado);
}

function esconderErro(){
    const erroDiv = document.getElementById("mensagem-erro");
    if(!erroDiv.classList.contains('hidden')){
        erroDiv.classList.add('hidden');
    }
}

function mostrarErro(){
    const erroDiv = document.getElementById("mensagem-erro");
    erroDiv.classList.remove('hidden');

    var mensagem = '<i class="fas fa-exclamation-circle mr-2"></i>Valores inválidos!';
    erroDiv.innerHTML = `<p class="font-semibold">${mensagem}</p>`;
}

function esconderResultado(){
    const resultadoDiv = document.getElementById("resultado-container");
    if(!resultadoDiv.classList.contains('hidden')){
        resultadoDiv.classList.add('hidden');
    }

}

function mostrarResultado(resultado){
    const resultadoDiv = document.getElementById("resultado-container");
    resultadoDiv.classList.remove('hidden');

    document.getElementById("resultado").innerHTML = resultado;

}

