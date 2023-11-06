var cartasEmbaralhadas = []
var vetorAuxiliar = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
var jogadorHumano = []
var jogadorMaquina = []
var escolhaAtual = ""
var conjuntos4H = 0
var conjuntos4M = 0


function trocaCartasJogadores() {
    document.getElementsByClassName("cartas")[0].innerHTML = "<b>Suas cartas ("+jogadorHumano.length+"):</b>"
    document.getElementById("cartasJogadores").innerHTML = "<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!"
    document.getElementById("cartasJogadores").style.backgroundColor = "#fff"
    verificaCartasHumano()
}

function trocaConjuntos() {
    document.getElementById("conjuntos").innerHTML = "<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!"
}

function atualizaCampos(){
    conjuntoH()
    conjuntoM()
    trocaCartasJogadores()
    trocaConjuntos()
}

function trocaTextoTopo(texto) {
    document.getElementById("textoTopo").innerHTML = texto
}

function trocaEscolha(texto) {
    document.getElementById("escolha").innerHTML = texto
}

function trocaFinal(texto) {
    document.getElementById("final").innerHTML = texto
}

function mostrar(id){
    document.getElementById(id).style.display = "initial"
}

function esconder(id){
    document.getElementById(id).style.display = "none"
}

function verificaCartasHumano() {
    let cartas = document.getElementsByClassName("cartas")[0]

    if(document.getElementsByClassName("cartasDoJogador")[0] != null)
        document.getElementsByClassName("cartasDoJogador")[0].remove()

    let cartasDoJogador = document.createElement("div")
    cartasDoJogador.className = "cartasDoJogador"
    cartasDoJogador.style.flexDirection = "row"
    cartasDoJogador.style.justifyContent = "center"
    cartasDoJogador.style.flexWrap = "wrap"
    cartasDoJogador.style.maxWidth = "90vw"

    cartas.append(cartasDoJogador)
    jogadorHumano.forEach(carta => {
        adicionarCarta("cartasDoJogador", carta)
    })
}

function adicionarCarta(local, carta) {
    let img = document.createElement('img');
    img.src = `assets/cards/${carta}.png`;
    img.style.width = "100px"
    img.style.padding = "5px"
    document.getElementsByClassName(local)[0].appendChild(img);
}

function embaralhar(){
    mostrar("botao2")
    esconder("botao1")

    var cartas = ["AC","AE","AO","AP","2C","2E","2O","2P","3C","3E","3O","3P","4C","4E","4O","4P","5C","5E","5O","5P","6C","6E","6O","6P","7C","7E","7O","7P","8C","8E","8O","8P","9C","9E","9O","9P","10C","10E","10O","10P","JC","JE","JO","JP","QC","QE","QO","QP","KC","KE","KO","KP"]
    cartasEmbaralhadas = []
    while(cartas.length!=0){
        var valorAleatorio = Math.floor(Math.random()*cartas.length)
        cartasEmbaralhadas.push(cartas[valorAleatorio])
        cartas.splice(valorAleatorio,1)
    }
    
    trocaTextoTopo("As cartas estão embaralhadas!<br>Distribua as cartas e sorteie o primeiro jogador!")
    trocaConjuntos()
}

function conjuntoM(){
    var conjuntosMaquina = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorMaquina.length;j++){
            if(jogadorMaquina[j].startsWith(vetorAuxiliar[i])){
                conjuntosMaquina[i]++
                if(conjuntosMaquina[i]==4){
                    conjuntos4M++
                    for(var k=0;k<jogadorMaquina.length;k++){
                        if(jogadorMaquina[k].startsWith(vetorAuxiliar[i])){
                            jogadorMaquina.splice(k,1)
                        } 
                    }
                    jogadorMaquina.splice(-1,1)
                }
            }
        }
    }
}

function conjuntoH(){
    var conjuntosHumano = [0,0,0,0,0,0,0,0,0,0,0,0,0]
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorHumano.length;j++){
            if(jogadorHumano[j].startsWith(vetorAuxiliar[i])){
                conjuntosHumano[i]++
                if(conjuntosHumano[i]==4){
                    conjuntos4H++
                    for(var k=0;k<jogadorHumano.length;k++){
                        if(jogadorHumano[k].startsWith(vetorAuxiliar[i])){
                            jogadorHumano.splice(k,1)
                        } 
                    }
                    jogadorHumano.splice(-1,1)
                }
            }
        }
    }
}

function distribuirCartas(){
    esconder("botao2")
    esconder("textoTopo")
    mostrar("botao3")
    mostrar("cartasJogadores")

    for(var i=0; i<14; i++){
        if(i<7){
            jogadorHumano.push(cartasEmbaralhadas[i])
        }else{
            jogadorMaquina.push(cartasEmbaralhadas[i])
        }
    }
    cartasEmbaralhadas.splice(0,14)

    atualizaCampos()
}

function jogadorAleatorio(){
    esconder("botao3")
    mostrar("textoTopo")
    mostrar("conjuntos")

    var players = ["<b>Você começa!</b><br>Tente adivinhar uma carta que a Máquina tem!","<b>A Máquina começa!</b><br>Veja qual é a jogada dela!"]
    var firstPlayer = Math.floor(Math.random()*players.length)
    trocaTextoTopo(players[firstPlayer])
    trocaTextoTopo(players[firstPlayer])
    
    switch (firstPlayer){
        case 1:
            mostrar("botao5")
            break
        case 0:
            mostrar("select")
            mostrar("botao4")
            break
    }
}

function jogadaHumano(){
    esconder("select")
    esconder("botao4")
    esconder("escolha")
    esconder("textoTopo")
    mostrar("botao6")

    var escolha = document.getElementById("select").value
    trocaEscolha(escolha)
    escolhaAtual = escolha
    
    atualizaCampos()
}

function jogadaMaquina(){
    esconder("botao5")
    mostrar("botao7")
    mostrar("escolha")

    var numeros = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"]
    escolhaAtual = Math.floor(Math.random()*numeros.length)
    trocaEscolha(numeros[escolhaAtual])
    escolhaAtual = numeros[escolhaAtual] + ""
    
    atualizaCampos()
}

function verificaM(){
    mostrar("escolha")

    var achou = false
    for(var i=0;i<jogadorMaquina.length;i++){
        if(jogadorMaquina[i].startsWith(escolhaAtual)){
            achou = true
            jogadorHumano.push(jogadorMaquina[i])
            jogadorMaquina.splice(i,1)
            trocaEscolha("Acertou, jogue novamente!")
            esconder("botao6")
            mostrar("select")          
            mostrar("botao4")        
            i--
        }
    }
    if(!achou){
        trocaEscolha("Errou, compre uma carta!")
        esconder("botao6")
        mostrar("botao8")
        mostrar("escolha")
    }
    atualizaCampos()
}
        
function verificaH(){
    var achou = false
    for(var i=0;i<jogadorHumano.length;i++){
        if(jogadorHumano[i].startsWith(escolhaAtual)){
            achou = true
            jogadorMaquina.push(jogadorHumano[i])
            jogadorHumano.splice(i,1)
            trocaEscolha("A Máquina acertou, é vez dela novamente!")
            esconder("botao7")
            mostrar("botao5")
            i--
        }
    }
    if(!achou){
        trocaEscolha("A Máquina errou, compre uma carta para ela!")
        esconder("botao7")
        esconder("textoTopo")
        mostrar("botao9")
    }
    atualizaCampos()
}

function comprar(){
    esconder("botao8")
    mostrar("botao5")

    jogadorHumano.push(cartasEmbaralhadas[0])
    cartasEmbaralhadas.splice(cartasEmbaralhadas,1)
    trocaEscolha("Vez da Máquina!")
    trocaCartasJogadores()
    
    if(cartasEmbaralhadas.length==0 || jogadorMaquina.length === 0 || jogadorHumano.length === 0){
        esconder("botao6")
        esconder("botao7")
        esconder("escolha")
        if(conjuntos4H>conjuntos4M || jogadorMaquina.length === 0){
            trocaFinal("Você ganhou o jogo!!!")
        }
        if(conjuntos4H<conjuntos4M || jogadorHumano.length === 0){
            trocaFinal("Você perdeu o jogo!!!")
        }
        if(conjuntos4H==conjuntos4M){
            trocaFinal("O jogo empatou!!!")
        }
    }
    atualizaCampos()
}

function comprarM(){
    esconder("botao9")
    mostrar("select")
    mostrar("botao4")

    jogadorMaquina.push(cartasEmbaralhadas[0])
    cartasEmbaralhadas.splice(cartasEmbaralhadas,1)
    
    trocaEscolha("Sua vez!")
    trocaCartasJogadores()
    if(cartasEmbaralhadas.length==0 || jogadorMaquina.length === 0 || jogadorHumano.length === 0){
        esconder("botao6")
        esconder("botao7")
        esconder("escolha")
        if(conjuntos4H>conjuntos4M){
            trocaFinal("Você ganhou o jogo!!!")
        }
        if(conjuntos4H<conjuntos4M){
            trocaFinal("Você perdeu o jogo!!!")
        }
        if(conjuntos4H==conjuntos4M){
            trocaFinal("O jogo empatou!!!")
        }
    }
    atualizaCampos()
}