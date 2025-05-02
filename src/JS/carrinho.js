let carrinhoAtivacao = false;
var carrinho = document.getElementById("cartContainer");
var cardPresente = false;
var contador = 0;
var aposPrimeiro = false;

// Ativação/desativação do carrinho

function ativarCarrinho() {
    let larguraTela = window.innerWidth;
    carrinhoAtivacao = !carrinhoAtivacao;
    if (larguraTela <= 800) {
        if (carrinhoAtivacao == true) {
            $("#cartContainer").css({
                "top": "0rem"
            });
            $("#voltarTopo").css({
                "display": "none"
            });
            $("#pedidoBox").css({
                "transform": "translateY(-150%)"
            })
        } else {
            $("#cartContainer").css({
                "top": "-62.5rem"
            });
            $("#voltarTopo").css({
                "display": "flex"
            });
            $("#pedidoBox").css({
                "transform": "translateY(0%)"
            })
        }
    } else {
        if (carrinhoAtivacao == true) {
            $("#cartContainer").css({
                "right": "0rem"
            });
        } else {
            $("#cartContainer").css({
                "right": "-17.8rem"
            });
            $("#pedidoBox").css({
                "transform": "translateY(0%)"
            });
        }
    }
    $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon.png");
    $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon.png");
}

function verificarSubtotal() {
    let saldoPedido = $(".cardContent").find(".precoProduto").map(function() {
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
            contador = carrinho.children.length;

            carrinho.innerHTML += 
            "<div class = 'carrinhoCard' data-id='"+cardCarrinho.dataset.id+"'>"
            +"<div class = 'cardContent'>"
            +cardCarrinho.innerHTML
            +"</div>"
            +"<div class='imgRemoverCard' onclick='removerCard("+cardCarrinho.dataset.id+");'><img src='./src/imgs/icons/error.png' width='100%'/></div>"
            +"</div>";
            $(".cardContent").find("#btnProduto").each(function() {
                $(this).attr("class", "precoProduto");
            });
        
            var carrinhoCard = document.getElementsByClassName("cardContent");
            var ultCard = carrinhoCard[carrinhoCard.length - 1];

            // Com a remoção da tag, a tag seguinte passa a ocupar o mesmo índice, por isso a repetição
            ultCard.removeChild(ultCard.children[2]);
            ultCard.removeChild(ultCard.children[2]);

            // Evitando repetições de card
            if (contador > 0) {
                for (let help = 0; help < carrinho.children.length; help++) {
                    for (let help2 = help + 1; help2 < carrinho.children.length; help2++) {
                        let card1 = carrinho.children[help];
                        let card2 = carrinho.children[help2];

                        if ($(card2).attr('data-id') == $(card1).attr('data-id')) {
                            $(card2).remove();
                        }
                    }
                }
            }

            $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png"); // Mobile
            $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png"); // Padrão


            $("#saldoPedido").html("<p>Subtotal: "+verificarSubtotal()+" ₯</p>");

            armazenarCarrinho();
            });
        }

        $("#corpo").append("<div id='pedidoBox'></div>");
        $("#pedidoBox").html(
            "<div id='saldoPedido'><p>Subtotal: "+verificarSubtotal()+" ₯</p></div>"
            +"<div id='btnPedido' onclick='finalizarPedido();'>Finalizar pedido</div>"
        );
    }, 1000);
}

function removerCard(dataID) {
    if(confirm("Deseja remover este cupom do carrinho?")) {
        let card = $('.carrinhoCard[data-id="'+dataID+'"]');
        card.remove();
    }

    $("#saldoPedido").html("<p>Subtotal: "+verificarSubtotal()+" ₯</p>");

    armazenarCarrinho();
}

function armazenarCarrinho() {
    let cardsCarrinho = $("#cartContainer").html();

    $.post(
        "./src/PHP/cookieCarrinho.php",
            {
                dadosCarrinho: cardsCarrinho
            }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
        }
    )
}

function carregarCarrinhoSalvo() {
    let cookieCarrinho = document.cookie.split(';');

    if (cookieCarrinho[1] != null) {
        cookieCarrinho = cookieCarrinho[1].split('=')[1];
        cookieCarrinho = decodeURIComponent(cookieCarrinho);
        setTimeout(() => {
            $("#cartContainer").append(cookieCarrinho);
            $("#saldoPedido").html("<p>Subtotal: "+verificarSubtotal()+" ₯</p>");
        }, 1000);
    }
}