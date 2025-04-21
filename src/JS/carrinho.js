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

function verificarSubtotal() {
    let saldoPedido = $(".carrinhoCard").find(".precoProduto").map(function() {
        let preco = $(this).html().replace('₯', '').trim();
        return parseFloat(preco);
    }).get();

    saldoPedido = saldoPedido.reduce((total, valorArray) => total + valorArray, 0);
    return saldoPedido;
}

// Inserção/Remoção dos cards de produtos do carrinho
function chamarCarrinho() {
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
            "<div class = 'carrinhoCard' data-id='"+cardCarrinho.dataset.id+"'>" + 
            cardCarrinho.innerHTML +
            "</div>";
            $(".carrinhoCard").find("#btnProduto").each(function() {
                $(this).attr("class", "precoProduto");
            });
        
            var carrinhoCard = document.getElementsByClassName("carrinhoCard");
            var ultCard = carrinhoCard[carrinhoCard.length - 1];

            // Com a remoção da tag, a tag seguinte passa a ocupar o mesmo índice, por isso a repetição
            ultCard.removeChild(ultCard.children[2]);
            ultCard.removeChild(ultCard.children[2]);

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

            $("#saldoPedido").html("<p>Subtotal: "+verificarSubtotal()+" ₯</p>");
            });
        }

        $("#cartContainer").append("<div id='pedidoBox'></div>");
        $("#pedidoBox").html(
            "<div id='saldoPedido'><p>Subtotal: "+verificarSubtotal()+" ₯</p></div>"
            +"<div id='btnPedido' onclick='finalizarPedido();'>Finalizar pedido</div>"
        );
        
    }, 1000);
}