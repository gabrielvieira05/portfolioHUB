function gerarSenha(event) {
  event.preventDefault();

  const tamanho = parseInt(document.getElementById('tam').value);
  const usaMaiusculas = document.getElementById('maiusculas').checked;
  const usaNumeros = document.getElementById('numeros').checked;
  const usaSimbolos = document.getElementById('simbolos').checked;

  let caracteres = 'abcdefghijklmnopqrstuvwxyz';
  if (usaMaiusculas) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (usaNumeros) caracteres += '0123456789';
  if (usaSimbolos) caracteres += '!@#$%&*()-_=+[]{};:,.<>?';

  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  document.getElementById('resultado').textContent = senha;
}
