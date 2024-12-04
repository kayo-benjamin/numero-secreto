let listaNumeroSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.7; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um numero de 1 e 100:');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou!');
        let palavraTentativas =  tentativas > 1 ? 'tentativas' : 'tentativa';
        let tentativasMenssage = `Você descobriu o numero com ${tentativas} ${palavraTentativas}`;
        exibirTexto('p', tentativasMenssage);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirTexto('p', 'O numero é menor!');
        } else{
            exibirTexto('p', 'O numero é maior!');
        }
        tentativas++;
        limparCampo();
    }
}
//A nomenclatura no nosso codigo é importante!
//sem parametro
//Evitar a repetição de codigo com funções!!!
function gerarNumeroAleatorio() {
    //retornando numero inteiro aleatorio entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosDaLista = listaNumeroSorteados.length;

    if(quantidadeElementosDaLista == numeroLimite){
        listaNumeroSorteados = [];
    }
    if(listaNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto == gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}