//pega o input o botão e o paragrafo
const input = document.querySelectorAll('input');
const buttons = document.querySelectorAll('button');
const [confere, reset] = buttons;
const multiplicacao = document.querySelectorAll('p');
const acertos = document.querySelector('#acertos');
const record = document.querySelector('#record');
let pontuacao = 0;
let pontuacaoMax = 0;


//função para guardar a pontuação maxima no local storage
function guardaPontuacao() {
    if (pontuacao > pontuacaoMax) {
        pontuacaoMax = pontuacao;
        localStorage.setItem('pontuacaoMax', pontuacaoMax);
    }
    pegaPontuacao();
}

//função para pegar a pontuação maxima do local storage
function pegaPontuacao() {
    if (localStorage.getItem('pontuacaoMax') === null) {
        localStorage.setItem('pontuacaoMax', 0);
    }
    pontuacaoMax = Number(localStorage.getItem('pontuacaoMax'));
    record.innerHTML = ` ${pontuacaoMax}`;
}
pegaPontuacao();

//função que verifica se o usuário acertou ou errou e soma a pontuação e mostra na tela e confere se a pontuação maxima foi batida e guarda a pontuação da sessão
function verificaResposta() {
    multiplicacao.forEach((paragrafo, index) => {
        const num1 = Number(paragrafo.innerHTML.split('x')[0]);
        const num2 = Number(paragrafo.innerHTML.split('=')[0].split('x')[1]);
        const resultado = num1 * num2;
        //confere se o input esta vazio
        if (input[index].value === '' || resultado !== Number(input[index].value)) {
            input[index].style.backgroundColor = 'red';
        } else if (resultado === Number(input[index].value)) {
            input[index].style.backgroundColor = 'green';
            pontuacao++;
            acertos.innerHTML = ` ${pontuacao}`;
            guardaPontuacao();
        }
    })
};

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
                if (resultados.length > 0) {
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

//não permitir que o usuario coloque numero negativo ou maior que 100 ou com virgula
input.forEach(input => {
    input.addEventListener('change', (e) => {
        if (Number(input.value) < 0 || Number(input.value) > 100 || input.value.includes(',')) {
            input.value = '';
        }
    })
});

//verificar respostas ao clicar no botão
confere.addEventListener('click', verificaResposta);

//resetar os inputs e gerar novos numeros e tirar os vermelhos e verdes
reset.addEventListener('click', () => {
    input.forEach(input => {
        input.value = '';
        input.style.backgroundColor = 'white';
    });
    criaNumeros();
});

criaNumeros();