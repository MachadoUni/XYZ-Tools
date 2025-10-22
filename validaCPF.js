const cpfInput = document.getElementById('cpf-input');

cpfInput.addEventListener('input', function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    value = value.slice(0, 11);

    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length > 6 && value.length <= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    e.target.value = value;
});

  async function colarCPF() {
    try {
      const texto = await navigator.clipboard.readText();
      document.getElementById("cpf-input").value = texto;
    } catch (err) {
      alert("Não foi possível colar do clipboard. Permita o acesso.");
    }
  }

cpfInput.addEventListener('keypress', function (e) {
    const char = String.fromCharCode(e.which);
    
    if (!/[0-9]/.test(char)) {
        e.preventDefault();
    }

    const value = cpfInput.value.replace(/\D/g, '');
    if (value.length >= 11) {
        e.preventDefault();
    }
});

function validaCPF(cpf) {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11)
        return false

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1)
        return false

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false

    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false

    return true
}

function mostrarResultado() {
    var ehValido = validaCPF(document.getElementById("cpf-input").value);
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    resultadoDiv.classList.add(ehValido ? 'bg-green-100' : 'bg-red-100', ehValido ? 'text-green-700' : 'text-red-700');

    var mensagem = ehValido
        ? '<i class="fas fa-check-circle mr-2"></i>CPF válido!'
        : '<i class="fas fa-times-circle mr-2"></i>CPF inválido!';

    resultadoDiv.innerHTML = `<p class="font-semibold">${mensagem}</p>`;
    resultadoDiv.classList.remove('hidden');
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        mostrarResultado(); 
    }
});