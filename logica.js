var cartas = ["AC","AE","AO","AP","2C","2E","2O","2P","3C","3E","3O","3P","4C","4E","4O","4P","5C","5E","5O","5P","6C","6E","6O","6P","7C","7E","7O","7P","8C","8E","8O","8P","9C","9E","9O","9P","10C","10E","10O","10P","JC","JE","JO","JP","QC","QE","QO","QP","KC","KE","KO","KP"];
var cartasOriginal = ["AC","AE","AO","AP","2C","2E","2O","2P","3C","3E","3O","3P","4C","4E","4O","4P","5C","5E","5O","5P","6C","6E","6O","6P","7C","7E","7O","7P","8C","8E","8O","8P","9C","9E","9O","9P","10C","10E","10O","10P","JC","JE","JO","JP","QC","QE","QO","QP","KC","KE","KO","KP"];
var numeros = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
var cartasEmbaralhadas = [];
var valorAleatorio = 0;
var jogadorHumano = [];
var jogadorMaquina = [];
var firstPlayer = 0;
var escolha = 0;
var numero = [];
var mesa = [];
var a = "" ;
var vetorAuxiliar = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
var conjuntosHumano = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var conjuntosMaquina = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var conjuntos4H = 0;
var conjuntos4M = 0;
var cartasMesa = [];

function embaralhar(){
    var cartas = ["AC","AE","AO","AP","2C","2E","2O","2P","3C","3E","3O","3P","4C","4E","4O","4P","5C","5E","5O","5P","6C","6E","6O","6P","7C","7E","7O","7P","8C","8E","8O","8P","9C","9E","9O","9P","10C","10E","10O","10P","JC","JE","JO","JP","QC","QE","QO","QP","KC","KE","KO","KP"];
    cartasEmbaralhadas = [];
    while(cartas.length!=0){
        valorAleatorio = Math.floor(Math.random()*cartas.length);
        cartasEmbaralhadas.push(cartas[valorAleatorio]);
        cartas.splice(valorAleatorio,1);
    }
    document.getElementById("numero").innerHTML = "As cartas estão embaralhadas!<br>Distribua as cartas e sorteie o primeiro jogador!"
}

function distribuirCartas(){
    for(var i=0;i<14;i++){
        if(i<7){
            jogadorHumano.push(cartasEmbaralhadas[i]);
        }else{
            jogadorMaquina.push(cartasEmbaralhadas[i]);
        }
    }
    cartasEmbaralhadas.splice(0,14);
    document.getElementById("conjuntos").innerHTML = "Você fez "+conjuntos4H+" conjuntos!";
    document.getElementById("conjuntos2").innerHTML = "A Máquina fez "+conjuntos4M+" conjuntos!";
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
}

function jogadorAleatorio(){
    var players = ["Você começa!<br>Tente adivinhar uma carta que a Máquina tem!","A Máquina começa!<br>Veja qual é a jogada dela!"];
    firstPlayer = Math.floor(Math.random()*players.length);
    document.getElementById("jogadores").innerHTML = players[firstPlayer];
}

function jogadaMaquina(){
    var numeros = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
    jogadaAleatoria = Math.floor(Math.random()*numeros.length);
    document.getElementById("escolha").innerHTML = numeros[jogadaAleatoria];
    a = numeros[jogadaAleatoria] +"";
}

function jogadaHumano(){
    var escolha = document.getElementById("input").value;
    document.getElementById("escolha").innerHTML = escolha;
    a = escolha;
}

function verificaM(){
    for(var i=0;i<jogadorMaquina.length;i++){
        if(jogadorMaquina[i].startsWith(a)){
            jogadorHumano.push(jogadorMaquina[i]);
            console.log(i);
            jogadorMaquina.splice(i,1);
            document.getElementById("escolha").innerHTML = "Acertou, jogue novamente!";             
            i--;
        }
    }
    conjuntosMaquina = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorMaquina.length;j++){
            if(jogadorMaquina[j].startsWith(vetorAuxiliar[i])){
                conjuntosMaquina[i]++;
                if(conjuntosMaquina[i]==4){
                    conjuntos4M++;
                    for(var k=0;k<jogadorMaquina.length;k++){
                        if(jogadorMaquina[k].startsWith(vetorAuxiliar[i])){
                            cartasMesa.push(jogadorMaquina[k]);
                            jogadorMaquina.splice(k,1); 
                        } 
                    }
                }
            }
        }
    }
    document.getElementById("conjuntos").innerHTML = "Você fez "+conjuntos4H+" conjuntos!";
    document.getElementById("conjuntos2").innerHTML = "A Máquina fez "+conjuntos4M+" conjuntos!";
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
    fimDeJogo();
}
        
function verificaH(){
    for(var i=0;i<jogadorHumano.length;i++){
        if(jogadorHumano[i].startsWith(a)){
            jogadorMaquina.push(jogadorHumano[i]);
            jogadorHumano.splice(i,1);
            document.getElementById("escolha").innerHTML = "A Máquina acertou, é vez dela novamente!";
        }
    }
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
    fimDeJogo();
}

function comprar(){
    jogadorHumano.push(cartasEmbaralhadas[0]);
    cartasEmbaralhadas.splice(cartasEmbaralhadas,1);
    document.getElementById("escolha").innerHTML = "Vez da Máquina!";              
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
    if(cartasEmbaralhadas.length==0){
        if(conjuntos4H>conjuntos4M){
            document.getElementById("final").innerHTML = "Você ganhou o jogo!!!";
        }
        if(conjuntos4H<conjuntos4M){
            document.getElementById("final").innerHTML = "Você perdeu o jogo!!!";
        }
        if(conjuntos4H==conjuntos4M){
            document.getElementById("final").innerHTML = "O jogo empatou!!!";
        }
    }
    conjuntosHumano = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorHumano.length;j++){
            if(jogadorHumano[j].startsWith(vetorAuxiliar[i])){
                conjuntosHumano[i]++;
                if(conjuntosHumano[i]==4){
                    conjuntos4H++;
                    for(var k=0;k<jogadorHumano.length;k++){
                        if(jogadorHumano[k].startsWith(vetorAuxiliar[i])){
                            cartasMesa.push(jogadorHumano[k]);
                            jogadorHumano.splice(k,1); 
                        } 
                    }
                }
            }
        }
    }
    conjuntosMaquina = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorMaquina.length;j++){
            if(jogadorMaquina[j].startsWith(vetorAuxiliar[i])){
                conjuntosMaquina[i]++;
                if(conjuntosMaquina[i]==4){
                    conjuntos4M++;
                    for(var k=0;k<jogadorMaquina.length;k++){
                        if(jogadorMaquina[k].startsWith(vetorAuxiliar[i])){
                            cartasMesa.push(jogadorMaquina[k]);
                            jogadorMaquina.splice(k,1); 
                        } 
                    }
                }
            }
        }
    }
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
    document.getElementById("conjuntos").innerHTML = "Você fez "+conjuntos4H+" conjuntos!";
    document.getElementById("conjuntos2").innerHTML = "A Máquina fez "+conjuntos4M+" conjuntos!";
}
function comprarM(){
    jogadorMaquina.push(cartasEmbaralhadas[0]);
    cartasEmbaralhadas.splice(cartasEmbaralhadas,1);
    document.getElementById("escolha").innerHTML = "Sua vez!";              
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
    if(cartasEmbaralhadas.length==0){
        if(conjuntos4H>conjuntos4M){
            document.getElementById("final").innerHTML = "Você ganhou o jogo!!!";
        }else{
            document.getElementById("final").innerHTML = "Você perdeu o jogo!!!";
        }
    }
    conjuntosHumano = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorHumano.length;j++){
            if(jogadorHumano[j].startsWith(vetorAuxiliar[i])){
                conjuntosHumano[i]++;
                if(conjuntosHumano[i]==4){
                    conjuntos4H++;
                    for(var k=0;k<jogadorHumano.length;k++){
                        if(jogadorHumano[k].startsWith(vetorAuxiliar[i])){
                            cartasMesa.push(jogadorHumano[k]);
                            jogadorHumano.splice(k,1); 
                        } 
                    }
                }
            }
        }
    }
    conjuntosMaquina = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=0;i<vetorAuxiliar.length;i++){
        for(var j=0;j<jogadorMaquina.length;j++){
            if(jogadorMaquina[j].startsWith(vetorAuxiliar[i])){
                conjuntosMaquina[i]++;
                if(conjuntosMaquina[i]==4){
                    conjuntos4M++;
                    for(var k=0;k<jogadorMaquina.length;k++){
                        if(jogadorMaquina[k].startsWith(vetorAuxiliar[i])){
                            cartasMesa.push(jogadorMaquina[k]);
                            jogadorMaquina.splice(k,1); 
                        } 
                    }
                }
            }
        }
    }
    document.getElementById("cartasJogadores").innerHTML = "Suas cartas ("+jogadorHumano.length+"): "+jogadorHumano+".<br>"+"A Máquina possui "+jogadorMaquina.length+" cartas!<br>"+"O montinho possui "+cartasEmbaralhadas.length+" cartas!";
    document.getElementById("conjuntos").innerHTML = "Você fez "+conjuntos4H+" conjuntos!";
    document.getElementById("conjuntos2").innerHTML = "A Máquina fez "+conjuntos4M+" conjuntos!";
}