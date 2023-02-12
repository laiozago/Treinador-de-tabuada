//pega o input o botão e o paragrafo
const input = document.querySelectorAll('input');
const buttons = document.querySelectorAll('button');
const [confere, reset] = buttons;
const multiplicacao = document.querySelectorAll('p');
 // tira p paragrafo do footer que não é necessário

//função que cria dois numeros aleatŕios até 10 e coloca na tela no paragrafo
function criaNumeros() {
    multiplicacao.forEach(paragrafo => {
        const numero1 = Math.floor(Math.random() * 11);
        const numero2 = Math.floor(Math.random() * 11);
        paragrafo.innerHTML = `${numero1} x ${numero2} = `;
    });
    
}

//não deixa o usuário digitar letras
input.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (isNaN(e.key)) {
            e.preventDefault();
        }
    })
});

//função para as mulplicações não ficarem com o mesmo resultado
function verificaIgualdade() {
    multiplicacao.forEach((paragrafo, index) => {
        const num1 = paragrafo.innerHTML.split('x')[0];
        const num2 = paragrafo.innerHTML.split('=')[0].split('x')[1];
        const resultado = num1 * num2;
        if (resultado == input[index].value) {
            criaNumeros();
            verificaIgualdade();
        }
    })
}
verificaIgualdade();
//função que pega o valor do input e compara com o resultado da multiplicação
function verificaResposta() {
    multiplicacao.forEach((paragrafo, index) => {
        const num1 = paragrafo.innerHTML.split('x')[0];
        const num2 = paragrafo.innerHTML.split('=')[0].split('x')[1];
        console.log(num1, num2);
        const resultado = num1 * num2;
        if (resultado == input[index].value) {
            input[index].style.backgroundColor = 'green';
        }else {
            input[index].style.backgroundColor = 'red';
        }
    })
};

//verificar respostas ao clicar no botão
confere.addEventListener('click', verificaResposta);
//recarregar a página ao clicar no botão
reset.addEventListener('click', () => {
    //recarrega a página
    location.reload();
});
criaNumeros();