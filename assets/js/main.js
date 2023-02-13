//pega o input o botão e o paragrafo
const input = document.querySelectorAll('input');
const buttons = document.querySelectorAll('button');
const [confere, reset] = buttons;
const multiplicacao = document.querySelectorAll('p');

//função que cria dois numeros aleatŕios até 10 e coloca na tela no paragrafo
function criaNumeros() {
    const multiplicacoes = [];
    const resultados = [];
    multiplicacao.forEach(paragrafo => {
        let repetir = true;
        do {
            const num1 = Math.floor(Math.random() * 11);
            const num2 = Math.floor(Math.random() * 11);
            const resultado = num1 * num2;
            if (resultados.includes(resultado)) {
                continue;
            } else {
                resultados.push(resultado);
                multiplicacoes.push([num1, num2]);
                if (resultados.length >= 10) {
                    repetir = false;
                }
            }
        } while (repetir);
    });
    multiplicacao.forEach((paragrafo, index) => {
        paragrafo.innerHTML = `${multiplicacoes[index][0]} x ${multiplicacoes[index][1]} =`;
    }
    );
}



//não deixa o usuário digitar letras
input.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (isNaN(e.key)) {
            e.preventDefault();
        }
    })
});

//função que pega o valor do input e compara com o resultado da multiplicação
function verificaResposta() {
    multiplicacao.forEach((paragrafo, index) => {
        const num1 = Number(paragrafo.innerHTML.split('x')[0]);
        const num2 = Number(paragrafo.innerHTML.split('=')[0].split('x')[1]);
        const resultado = num1 * num2;
        //confere se o input esta vazio
        if (input[index].value === '' || resultado !== Number(input[index].value)) {
            input[index].style.backgroundColor = 'red';
        }else if (resultado === Number(input[index].value)) {
            input[index].style.backgroundColor = 'green';
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