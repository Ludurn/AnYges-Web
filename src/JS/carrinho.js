
let cards = [];

// Ativação/desativação do carrinho

function ativarCarrinho() {
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
        //$("#carregandoGif").remove();
        $("#cartContainer").css("justify-content","flex-start");
        var catalogoProdutos = document.getElementsByClassName("btnProdutos");
        for (i = 0; i < catalogoProdutos.length; i++) {
            catalogoProdutos[i].addEventListener("click", function adicionarCard() {
                let btnCupom = event.target;
                let cupom = btnCupom.parentElement;

                if (!cards.includes(cupom.dataset.id)) {
                    cards.push(cupom.dataset.id);

                    $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png"); // Mobile
                    $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png"); // Padrão
        
                    armazenarCarrinho(cards);
                }
            });
        }
    }, 1000);
}

function removerCard(dataID) {
    if(confirm("Deseja remover este cupom do carrinho?")) {
        if (cards.includes(dataID)) {
            let index = cards.indexOf(dataID);
            cards.splice(index, 1);
        }
    }

    armazenarCarrinho(cards);
}

function armazenarCarrinho(cards) {
    let cardsCarrinho = cards;

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

        $.post(
            "./src/PHP/carrinho.php",
                {
                    idCards: cookieCarrinho
                }
        )
        .done(
            function (retorno) {
                alert(retorno)
                retorno = JSON.parse(retorno);

                $("#cartContainer").append(cookieCarrinho);
                $("#saldoPedido").html("<h2>Subtotal: "+verificarSubtotal()+" ₯</h2>");
            }
        )
    }
}