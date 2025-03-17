let ativacao = false;
var carrinho = document.getElementById("cartContainer");
var cardPresente = false;
var contador = 0;
var aposPrimeiro = false;

// Ativação/desativação do carrinho

function ativarCarrinho() {
    let larguraTela = window.innerWidth;
    ativacao = !ativacao;
    if (larguraTela <= 800) {
        if (ativacao == true) {
            $("#cartContainer").css({
                "top": "0px"
            });
        } else {
            $("#cartContainer").css({
                "top": "-1100px"
            });
        }
    } else {
        if (ativacao == true) {
            $("#cartContainer").css({
                "right": "0px"
            });
        } else {
            $("#cartContainer").css({
                "right": "-285px"
            });
        }
    }
}

// Inserção/Remoção dos cards de produtos do carrinho
function chamarCarrinho(localChamada) {
    if (localChamada == 'pesquisa') {
        setTimeout(() => {
            var catalogoProdutos = document.getElementsByClassName("btnProdutos");
            for (i = 0; i < catalogoProdutos.length; i++) {
                catalogoProdutos[i].addEventListener("click", function adicionarCard() {
                var target = event.target;
                //Elemento-pai que sofreu evento que chamou esta função será armazenado nesta variável abaixo
                var cardCarrinho = target.parentElement;
                
                carrinho.innerHTML += 
                "<div class = 'carrinhoCard'>" + 
                cardCarrinho.innerHTML +
                "<div class='quantidade'>" +
                "<p>Quantidade:</p>" +
                "<input type='number' class='quantidadeCard' placeholder='Qtde:' min= 1 max= 99>" +
                "</div>" +
                "</div>";
            
                var carrinhoCard = document.getElementsByClassName("carrinhoCard");
            
                // Com a remoção da tag, a tag seguinte passa a ocupar o mesmo índice, por isso a repetição
                carrinhoCard[carrinho.children.length - 1].removeChild(carrinhoCard[carrinho.children.length - 1].  children[2]);
                carrinhoCard[carrinho.children.length - 1].removeChild(carrinhoCard[carrinho.children.length - 1].  children[2]);
            
                // Evitando repetições de card
                if (contador > 0) {
                    for (help = 1; help < carrinho.children.length; help++) {
                        if (carrinho.lastElementChild.innerHTML == carrinho.children[help - 1].innerHTML) {
                            carrinho.removeChild(carrinho.lastElementChild);
                        }
                    }
                }
                $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png");
                $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png");
                contador++;
                });
            }
        }, 1000);
    } else if (localChamada == 'filteron') {
        setTimeout(() => {
            var catalogoProdutos = document.getElementsByClassName("btnProdutos");
            for (i = 0; i < catalogoProdutos.length; i++) {
                catalogoProdutos[i].addEventListener("click", function adicionarCard() {
                var target = event.target;
                //Elemento-pai que sofreu evento que chamou esta função será armazenado nesta variável abaixo
                var cardCarrinho = target.parentElement;
    
                carrinho.innerHTML += 
                "<div class = 'carrinhoCard'>" + 
                cardCarrinho.innerHTML +
                "<div class='quantidade'>" +
                "<p>Quantidade:</p>" +
                "<input type='number' class='quantidadeCard' placeholder='Qtde:' min= 1 max= 99>" +
                "</div>" +
                "</div>";
            
                var carrinhoCard = document.getElementsByClassName("carrinhoCard");
            
                // Com a remoção da tag, a tag seguinte passa a ocupar o mesmo índice, por isso a repetição
                carrinhoCard[carrinho.children.length - 1].removeChild(carrinhoCard[carrinho.children.length - 1].  children[2]);
                carrinhoCard[carrinho.children.length - 1].removeChild(carrinhoCard[carrinho.children.length - 1].  children[2]);
            
                // Evitando repetições de card
                if (contador > 0) {
                    for (help = 1; help < carrinho.children.length; help++) {
                        if (carrinho.lastElementChild.innerHTML == carrinho.children[help - 1].innerHTML) {
                            carrinho.removeChild(carrinho.lastElementChild);
                        }
                    }
                }
                $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png");
                $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png");
                contador++;
                });
            }
        }, 3000);
    } else {
        setTimeout(() => {
            $("#carregandoGif").remove();
            $("#cartContainer").css("justify-content","flex-start");
            var catalogoProdutos = document.getElementsByClassName("btnProdutos");
            for (i = 0; i < catalogoProdutos.length; i++) {
                catalogoProdutos[i].addEventListener("click", function adicionarCard() {
                var target = event.target;
                //Elemento-pai que sofreu evento que chamou esta função será armazenado nesta variável abaixo
                var cardCarrinho = target.parentElement;
    
                carrinho.innerHTML += 
                "<div class = 'carrinhoCard'>" + 
                cardCarrinho.innerHTML +
                "<div class='quantidade'>" +
                "<p>Quantidade:</p>" +
                "<input type='number' class='quantidadeCard' placeholder='1' min= 1 max= 99 value= 1>" +
                "</div>" +
                "</div>";
            
                var carrinhoCard = document.getElementsByClassName("carrinhoCard");
            
                // Com a remoção da tag, a tag seguinte passa a ocupar o mesmo índice, por isso a repetição
                carrinhoCard[carrinho.children.length - 1].removeChild(carrinhoCard[carrinho.children.length - 1].  children[2]);
                carrinhoCard[carrinho.children.length - 1].removeChild(carrinhoCard[carrinho.children.length - 1].  children[2]);
            
                // Evitando repetições de card
                if (contador > 0) {
                    for (help = 1; help < carrinho.children.length; help++) {
                        if (carrinho.lastElementChild.innerHTML == carrinho.children[help - 1].innerHTML) {
                            carrinho.removeChild(carrinho.lastElementChild);
                        }
                    }
                }
                $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png");
                $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png");
                contador++;
                });
            }
        }, 4000);
    }
}