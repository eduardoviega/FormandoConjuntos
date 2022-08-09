var cartasEmbaralhadas = [];
var jogadorHumano = [];
var jogadorMaquina = [];
var a = "" ;
var vetorAuxiliar = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
var conjuntos4H = 0;
var conjuntos4M = 0;


function trocaTextoTopo(texto) {
    document.getElementById("textoTopo").innerHTML = texto
}

function trocaCartasJogadores(texto) {
    document.getElementById("cartasJogadores").innerHTML = texto
    document.getElementById("cartasJogadores").style.backgroundColor = "#fff"
}

function trocaConjuntos(texto) {
    document.getElementById("conjuntos").innerHTML = texto
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


function embaralhar(){
    mostrar("botao2")
    esconder("botao1")
    var cartas = ["AC","AE","AO","AP","2C","2E","2O","2P","3C","3E","3O","3P","4C","4E","4O","4P","5C","5E","5O","5P","6C","6E","6O","6P","7C","7E","7O","7P","8C","8E","8O","8P","9C","9E","9O","9P","10C","10E","10O","10P","JC","JE","JO","JP","QC","QE","QO","QP","KC","KE","KO","KP"];
    cartasEmbaralhadas = [];
    while(cartas.length!=0){
        var valorAleatorio = Math.floor(Math.random()*cartas.length);
        cartasEmbaralhadas.push(cartas[valorAleatorio]);
        cartas.splice(valorAleatorio,1);
    }
    
    trocaTextoTopo("As cartas estão embaralhadas!<br>Distribua as cartas e sorteie o primeiro jogador!")
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!")
}

function conjuntoM(){
    var conjuntosMaquina = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorMaquina.length;j++){
            if(jogadorMaquina[j].startsWith(vetorAuxiliar[i])){
                conjuntosMaquina[i]++;
                if(conjuntosMaquina[i]==4){
                    conjuntos4M++;
                    for(var k=0;k<jogadorMaquina.length;k++){
                        if(jogadorMaquina[k].startsWith(vetorAuxiliar[i])){
                            jogadorMaquina.splice(k,1);
                        } 
                    }
                    jogadorMaquina.splice(-1,1);
                }
            }
        }
    }
    console.table('M: '+conjuntosMaquina)
    console.table(`   ${jogadorMaquina}`)
    console.table(`H: ${jogadorHumano}`)
    console.table('E: '+cartasEmbaralhadas)
    console.table('M: '+conjuntos4M)
    console.table('H: '+conjuntos4H)
    
    console.log(" ")
}

function conjuntoH(){
    var conjuntosHumano = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorHumano.length;j++){
            if(jogadorHumano[j].startsWith(vetorAuxiliar[i])){
                conjuntosHumano[i]++;
                if(conjuntosHumano[i]==4){
                    conjuntos4H++;
                    for(var k=0;k<jogadorHumano.length;k++){
                        if(jogadorHumano[k].startsWith(vetorAuxiliar[i])){
                            jogadorHumano.splice(k,1); 
                        } 
                    }
                    jogadorHumano.splice(-1,1);
                }
            }
        }
    }
    console.log('H: '+conjuntosHumano)
}

function distribuirCartas(){
    esconder("botao2")
    esconder("textoTopo")
    mostrar("botao3")
    mostrar("cartasJogadores")
    for(var i=0;i<14;i++){
        if(i<7){
            jogadorHumano.push(cartasEmbaralhadas[i]);
        }else{
            jogadorMaquina.push(cartasEmbaralhadas[i]);
        }
    }
    cartasEmbaralhadas.splice(0,14);

    //======
    conjuntoM()
    //====== 

    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!");
}

function jogadorAleatorio(){
    esconder("botao3")
    mostrar("textoTopo")
    mostrar("conjuntos")
    var players = ["Você começa!<br>Tente adivinhar uma carta que a Máquina tem!","A Máquina começa!<br>Veja qual é a jogada dela!"];
    var firstPlayer = Math.floor(Math.random()*players.length);
    trocaTextoTopo(players[firstPlayer]);
    trocaTextoTopo(players[firstPlayer]);
    
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
    var escolha = document.getElementById("select").value;
    trocaEscolha(escolha);
    a = escolha;
    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!");
}

function jogadaMaquina(){
    esconder("botao5")
    mostrar("botao7")
    mostrar("escolha")
    var numeros = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
    jogadaAleatoria = Math.floor(Math.random()*numeros.length);
    trocaEscolha(numeros[jogadaAleatoria]);
    a = numeros[jogadaAleatoria] +"";
    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!");
}

function verificaM(){
    mostrar("escolha")
    var achou = false
    for(var i=0;i<jogadorMaquina.length;i++){
        if(jogadorMaquina[i].startsWith(a)){
            achou = true
            jogadorHumano.push(jogadorMaquina[i]);
            jogadorMaquina.splice(i,1);
            trocaEscolha("Acertou, jogue novamente!");
            esconder("botao6")
            mostrar("select")          
            mostrar("botao4")        
            i--;
        }
    }
    if(!achou){
        trocaEscolha("Errou, compre uma carta!");  
        esconder("botao6")
        mostrar("botao8")
        mostrar("escolha")
    }
    
    conjuntoH()
    conjuntoM()

    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!");
}
        
function verificaH(){
    var achou = false
    for(var i=0;i<jogadorHumano.length;i++){
        if(jogadorHumano[i].startsWith(a)){
            achou = true
            jogadorMaquina.push(jogadorHumano[i]);
            jogadorHumano.splice(i,1);
            trocaEscolha("A Máquina acertou, é vez dela novamente!");
            esconder("botao7")
            mostrar("botao5")
            i--;
        }
    }
    if(!achou){
        trocaEscolha("A Máquina errou, compre uma carta para ela!");
        esconder("botao7")
        esconder("textoTopo")
        mostrar("botao9")
    }
    
    conjuntoH()
    conjuntoM()

    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
}

function comprar(){
    esconder("botao8")
    mostrar("botao5")
    jogadorHumano.push(cartasEmbaralhadas[0]);
    cartasEmbaralhadas.splice(cartasEmbaralhadas,1);
    trocaEscolha("Vez da Máquina!");              
    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    
    if(cartasEmbaralhadas.length==0 || jogadorMaquina.length === 0 || jogadorHumano.length === 0){
        esconder("botao6")
        esconder("botao7")
        esconder("escolha")
        if(conjuntos4H>conjuntos4M || jogadorMaquina.length === 0){
            trocaFinal("Você ganhou o jogo!!!");
        }
        if(conjuntos4H<conjuntos4M || jogadorHumano.length === 0){
            trocaFinal("Você perdeu o jogo!!!");
        }
        if(conjuntos4H==conjuntos4M){
            trocaFinal("O jogo empatou!!!");
        }
    }
    
    conjuntoH()
    conjuntoM()

    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!");
}

function comprarM(){
    esconder("botao9")
    mostrar("select")
    mostrar("botao4")
    jogadorMaquina.push(cartasEmbaralhadas[0]);
    cartasEmbaralhadas.splice(cartasEmbaralhadas,1);
    
    trocaEscolha("Sua vez!");              
    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    if(cartasEmbaralhadas.length==0 || jogadorMaquina.length === 0 || jogadorHumano.length === 0){
        esconder("botao6")
        esconder("botao7")
        esconder("escolha")
        if(conjuntos4H>conjuntos4M){
            trocaFinal("Você ganhou o jogo!!!");
        }
        if(conjuntos4H<conjuntos4M){
            trocaFinal("Você perdeu o jogo!!!");
        }
        if(conjuntos4H==conjuntos4M){
            trocaFinal("O jogo empatou!!!");
        }
    }
    
    conjuntoH()
    conjuntoM()
    
    trocaCartasJogadores("<b>Suas cartas ("+jogadorHumano.length+"):</b> "+jogadorHumano+".<br>"+"<b>A Máquina possui:</b> "+jogadorMaquina.length+" cartas!<br>"+"<b>O Monte possui:</b> "+cartasEmbaralhadas.length+" cartas!");
    trocaConjuntos("<b>Você fez:</b> "+conjuntos4H+" conjuntos!<br><b>A Máquina fez:</b> "+conjuntos4M+" conjuntos!");
}