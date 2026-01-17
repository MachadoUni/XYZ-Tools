function contarTudo() {
    const textarea = document.getElementById('texto-input');
    const texto = textarea.value;

    const totalCaracteres = texto.length;

    const semEspaco = texto.replace(/\s+/g, '').length;

    const totalPalavras = texto.trim() === "" ? 0 : texto.trim().split(/\s+/).length;

    document.getElementById('cont-caracteres').innerText = totalCaracteres;
    document.getElementById('cont-sem-espaco').innerText = semEspaco;
    document.getElementById('cont-palavras').innerText = totalPalavras;
}

function limparTexto() {
    const textarea = document.getElementById('texto-input');
    textarea.value = "";
    contarTudo();
    textarea.focus();
}