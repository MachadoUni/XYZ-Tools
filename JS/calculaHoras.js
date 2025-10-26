let totalMinutes = 0;

function limparTudo() {
    totalMinutes = 0;
    atualizarResultado();
    document.getElementById("entrada-horas").value = '';

    let operacoesDiv = document.getElementById("operacoes-lancadas");
    operacoesDiv.innerHTML = ``;
    operacoesDiv.innerText = "Nenhuma operação realizada";
}

function formatarTempo(minutos) {
    let sinal = minutos < 0 ? "-" : "";
    minutos = Math.abs(minutos);

    let horas = Math.floor(minutos / 60);
    let mins = minutos % 60;

    return `${sinal}${String(horas).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function entradaParaMinutos(valor) {
    valor = valor.replace(":", "");
    let str = valor.padStart(4, "0");
    let horas = parseInt(str.slice(0, -2));
    let minutos = parseInt(str.slice(-2));
    return horas * 60 + minutos;
}

function atualizarResultado() {
    document.getElementById("total-acumulado").value = formatarTempo(totalMinutes);
}

function adicionarHistorico(sinal, minutos, acumuladoAntes) {
    let operacoesDiv = document.getElementById("operacoes-lancadas");

    if (operacoesDiv.innerText == "Nenhuma operação realizada") operacoesDiv.innerText = '';

    let operacao = document.createElement("div");
    let acumuladoDepois = totalMinutes;

    operacao.textContent = `${formatarTempo(acumuladoAntes)} ${sinal} ${formatarTempo(minutos)} = ${formatarTempo(acumuladoDepois)}`;
    operacoesDiv.append(operacao); 
}


document.getElementById("entrada-horas").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 2) {
        e.target.value = v.slice(0, -2) + ":" + v.slice(-2);
    } else {
        e.target.value = v;
    }
});

document.addEventListener("keydown", (event) => {
  const entrada = document.getElementById("entrada-horas").value;

  if (event.key === "+" && entrada) {
    let minutos = entradaParaMinutos(entrada);
    let acumuladoAntes = totalMinutes;
    totalMinutes += minutos;
    atualizarResultado();
    adicionarHistorico("+", minutos, acumuladoAntes);
    document.getElementById("entrada-horas").value = "";
  }

  if (event.key === "-" && entrada) {
    let minutos = entradaParaMinutos(entrada);
    let acumuladoAntes = totalMinutes;
    totalMinutes -= minutos;
    atualizarResultado();
    adicionarHistorico("-", minutos, acumuladoAntes);
    document.getElementById("entrada-horas").value = "";
  }
});



atualizarResultado();