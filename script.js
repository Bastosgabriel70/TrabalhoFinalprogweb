const modal = document.getElementById('modal');
const form = document.querySelector('.modal-form');
const saldoPrevisto = document.getElementById('previsto');
const saldoEfetivado = document.getElementById('efetivado');
const saldoRestante = document.getElementById('saldo');
const btnReceita = document.getElementById('receita');
const btnMais = document.getElementById('mais');
const btnCancelar = document.getElementById('cancelar');
const btnConfirmar = document.getElementById('confirmar');
const nomeGasto = document.getElementById('nomeGasto');
const dataGasto = document.getElementById('dataGasto');
const tipoGasto = document.getElementById('tipoGasto');
const valorGasto = document.getElementById('valorGasto');
const registrosEl = document.querySelector('#itens ol');

const registros = [];
let receita;

btnMais.querySelector('span').innerHTML = 'Informe a receita inicial.';

btnReceita.addEventListener('click', () => {
const valor = Math.trunc(parseFloat(prompt('Digite a sua receita inicial:')) * 100) / 100;
 if (isNaN(valor)) return alert('Digite um número válido! Lembre-se que as casas decimais são separadas por ponto (.).');
receita = valor;  
 btnMais.querySelector('span').innerHTML = 'Novo registro';  
btnMais.disabled = false;
  atualizarCampos();
});

btnMais.addEventListener('click', () => {
modal.classList.remove('hidden');
});

btnCancelar.addEventListener('click', () => {
 modal.classList.add('hidden');
});

form.addEventListener('submit', (evento) => {
evento.preventDefault();

const nome = nomeGasto.value;  
const data = dataGasto.value;  
const tipo = tipoGasto.value;  
const valor = parseFloat(valorGasto.value);  
registros.push({ nome: nome, gasto: tipo == 'gasto', data: data, valor: valor });  
form.reset();  
modal.classList.add('hidden');  
 renderizarGastos();  
atualizarCampos();
});

function removerRegistro(index, evento) {
registros.splice(index, 1);
 renderizarGastos();  
atualizarCampos();
}

function atualizarCampos() {
let efetivado = 0;
for (let i = 0; i < registros.length; i++) {
const reg = registros[i];
efetivado += reg.gasto ? -reg.valor : reg.valor;
}

const saldo = receita + efetivado;

saldoPrevisto.value = 'R$ ' + receita.toFixed(2);
saldoEfetivado.value = 'R$ ' + efetivado.toFixed(2);
saldoRestante.value = 'R$ ' + saldo.toFixed(2);
}

function renderizarGastos() {
registrosEl.innerHTML = '';

for (let i = 0; i < registros.length; i++) {
const registro = registros[i];
 const itemHTML = document.createElement('li');  
 itemHTML.className = 'item';  

 itemHTML.innerHTML = `  
     <div class="info">  
         <span class="descricao">${registro.nome}</span>  
         <div class="tipo">  
             <div class="representacao ${registro.gasto ? 'gasto' : 'ganho'}"></div>  
             <span>${registro.gasto ? 'Gasto' : 'Ganho'}</span>  
         </div>  
     </div>  
     <div class="detalhes">  
         <span class="valor ${registro.gasto ? 'negativo' : 'positivo'}">  
             ${registro.gasto ? '-' : '+'} R$ ${registro.valor.toFixed(2)}  
         </span>  
         <button class="remover" title="Remover"><i class="fas fa-trash-alt"></i></button>  
     </div>  
 `;  
 const botaoRemover = itemHTML.querySelector('.remover');  
 botaoRemover.onclick = removerRegistro.bind(null, i);  
registrosEl.appendChild(itemHTML);
}
}