async function consultarFeriados(ano) {
    try {
        const resp = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        return await resp.json();
    } catch (e) {
        console.error("Erro ao buscar feriados:", e);
        return [];
    }
}

async function processarCalculo() {
    const btn = document.getElementById('btn-calcular');
    const btnText = document.getElementById('btn-text');
    const dIni = document.getElementById('data-inicio').value;
    const dFim = document.getElementById('data-fim').value;
    const abono = parseInt(document.getElementById('input-abono').value) || 0;

    if (!dIni || !dFim) {
        alert("Por favor, selecione as datas de início e fim.");
        return;
    }

    btn.disabled = true;
    btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Calculando...';

    let data1 = new Date(dIni + 'T00:00:00');
    let data2 = new Date(dFim + 'T00:00:00');
    
    if (data1 > data2) [data1, data2] = [data2, data1];

    const anosNoPeriodo = [...new Set([data1.getFullYear(), data2.getFullYear()])];
    const feriadosArray = await Promise.all(anosNoPeriodo.map(consultarFeriados));
    const todosFeriados = feriadosArray.flat();

    let diasTrabalho = 0;
    let feriadosDescontados = [];
    let atual = new Date(data1);
    
    const contadorDias = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 };
    const nomesDias = ["Domingos", "Segundas", "Terças", "Quartas", "Quintas", "Sextas", "Sábados"];

    while (atual <= data2) {
        const isoData = atual.toISOString().split('T')[0];
        const diaSemana = atual.getDay();
        
        contadorDias[diaSemana]++;
        
        const feriadoObj = todosFeriados.find(f => f.date === isoData);

        if (diaSemana !== 0 && diaSemana !== 6) { 
            if (feriadoObj) {
                feriadosDescontados.push(feriadoObj);
            } else {
                diasTrabalho++; 
            }
        }
        atual.setDate(atual.getDate() + 1);
    }

    const totalFinal = Math.max(0, diasTrabalho - abono);

    atualizarInterface(totalFinal, feriadosDescontados, abono, contadorDias, nomesDias);

    btn.disabled = false;
    btnText.innerHTML = '<i class="fa-solid fa-calculator mr-2"></i> Calcular Dias Úteis';
}

function atualizarInterface(total, feriados, abono, contador, nomes) {
    const resDiv = document.getElementById('resultado-dias');
    resDiv.innerText = total;
    
    resDiv.classList.add('pulse-animation');
    setTimeout(() => resDiv.classList.remove('pulse-animation'), 500);

    document.getElementById('legenda-detalhada').innerText = 
        `${feriados.length} feriados oficiais e ${abono} abonos aplicados.`;

    document.getElementById('raio-x').classList.remove('hidden');
    document.getElementById('total-seg-sex').innerText = (contador[1]+contador[2]+contador[3]+contador[4]+contador[5]) + " dias";
    document.getElementById('total-sab-dom').innerText = (contador[0]+contador[6]) + " dias";

    document.getElementById('detalhe-dias').classList.remove('hidden');
    document.getElementById('lista-dias-semana').innerHTML = [1,2,3,4,5,6,0].map(i => `
        <div class="flex justify-between border-b border-borda/5 pb-0.5">
            <span>${nomes[i]}:</span>
            <span class="font-bold text-borda dark:text-light_borda">${contador[i]}</span>
        </div>`).join('');

    const contFeriados = document.getElementById('container-feriados');
    if (feriados.length > 0) {
        contFeriados.classList.remove('hidden');
        document.getElementById('lista-feriados').innerHTML = feriados.map(f => `
            <li>• ${f.name} (${f.date.split('-').reverse().join('/')})</li>
        `).join('');
    } else {
        contFeriados.classList.add('hidden');
    }
}

function limparTudo() {
    location.reload(); 
}