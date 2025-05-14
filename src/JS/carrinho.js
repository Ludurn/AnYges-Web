
let cards = [];

// Ativação/desativação do carrinho

function getCookieCarrinho() {
    let cookieCarrinho = document.cookie.split(';');

    if (cookieCarrinho[1] != null) {
        cookieCarrinho = cookieCarrinho[1].split('=')[1];
        cookieCarrinho = decodeURIComponent(cookieCarrinho);
        return cookieCarrinho;
    } else {
        return null;
    }
}

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

                    // let cookieCarrinho = getCookieCarrinho();

                    // if (cookieCarrinho != null) { 
                    //     cards = cookieCarrinho;
                    // }

                    localStorage.setItem("cardsArray", JSON.stringify(cards));

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
        let cards = JSON.parse(localStorage.getItem('cardsArray')) || [];
        cards = cards.map(Number);
        if (cards.includes(dataID)) {
            let index = cards.indexOf(Number(dataID));

            cards.splice(index, 1);
            localStorage.setItem("cardsArray", JSON.stringify(cards));
            $('.carrinhoCard[data-id="'+dataID+'"]').remove();

            if (cards == "") {
                cards = "";
            }
            armazenarCarrinho(cards);
        } else {
            cards = "";
             armazenarCarrinho(cards);
        }
    }
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

    let row=1;
    let itens=0;

    let cookieCarrinho = getCookieCarrinho();

    if (cookieCarrinho != null) {

        $.post(
            "./src/PHP/carrinho.php",
                {
                    idCards: cookieCarrinho
                }
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);

                for (let i=0; i<retorno.length; i++) {
                    construirPedido(row, retorno, i);
                    itens++;
                    row = agruparPedidos(itens, row);
                }
                $("#saldoPedido").html("<h2>Subtotal: "+verificarSubtotal()+" ₯</h2>");
            }
        )
    }
}

function construirPedido(row, retorno, indice) {
    $("#row-"+row).append(
        "<div class='carrinhoCard' data-id='"+retorno[indice]['ID_cupom']+"'>"
        +"<div class='cardContent'>"
        +"<div class='molduraProdutos'>"
        +"<figure>"
        +"<img src='"+retorno[indice]['imagem']+"' id='imgProduto' class='imgProdutos' alt='Principia GL-01' width='100%'>"
        +"</figure>"
        +"</div>"
        +"<p id='nomeProduto'>"+retorno[indice]['nome_cupom']+"</p>"
        +"<p>Desconto de <strong>"+retorno[indice]['desconto']+"%</strong></p>"
        +"<div id='btnProduto' class='precoProduto'>"+retorno[indice]['valor']+" ₯</div>"
        +"</div>"
        +"<div class='imgRemoverCard' onclick='removerCard("+retorno[indice]['ID_cupom']+")'>"
        +"<img src='./src/imgs/icons/error.png' width='100%'>"
        +"</div>"
        +"</div>"
    );
}

function agruparPedidos(itens) {

    if (larguraTela >= 1920) {
        if (itens < 6) {
            return 1;
        } else if (itens < 12) {
            return 2;
        } else if (itens < 18) {
            return 3;
        } else if (itens < 24) {
            return 4;
        } else if (itens < 30) {
            return 5;
        }
    } else if (larguraTela >= 1440) {
        if (itens < 5) {
            return 1;
        } else if (itens < 10) {
            return 2;
        } else if (itens < 15) {
            return 3;
        } else if (itens < 20) {
            return 4;
        } else if (itens < 25) {
            return 5;
        }
    } else {
        if (itens < 4) {
            return 1;
        } else if (itens < 8) {
            return 2;
        } else if (itens < 12) {
            return 3;
        } else if (itens < 16) {
            return 4;
        } else if (itens < 20) {
            return 5;
        }
    }
}