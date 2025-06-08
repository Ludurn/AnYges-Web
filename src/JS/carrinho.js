
let cards = [];

// Ativação/desativação do carrinho

function getCookieCarrinho() {

    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
        const [nome, valor] = cookie.trim().split('=');
        cookies[nome] = decodeURIComponent(valor);
    });

    if (cookieExists("carrinho")) {
        cookieCarrinho = cookies["carrinho"];
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
        $("#cartContainer").css("justify-content", "flex-start");
        var catalogoProdutos = document.getElementsByClassName("btnProdutos");
        for (i = 0; i < catalogoProdutos.length; i++) {

            if (catalogoProdutos[i].textContent != "Saldo não elegível" && !catalogoProdutos[i].hasAttribute('listener')) {
                catalogoProdutos[i].addEventListener("click", function adicionarCard() {

                    if (confirm("Deseja adicionar este cupom ao carrinho?") == true) {
                        let btnCupom = event.target;
                        let cupom = btnCupom.parentElement;
                        let cards = JSON.parse(localStorage.getItem('cardsArray')) || [];

                        if (!cards.includes(cupom.dataset.id)) {
                            cards.push(cupom.dataset.id);

                            localStorage.setItem("cardsArray", JSON.stringify(cards));

                            $("#iconeCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png"); // Mobile
                            $("#imagemCarrinho").attr('src', "./src/imgs/icons/carrinho_icon_ativo.png"); // Padrão
                
                            armazenarCarrinho(cards);
                        }
                    }
                });
                catalogoProdutos[i].setAttribute('listener', 'true'); // declara que o metodo ja foi adicionado ao elemento
            }
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
        $("#saldoPedido").html("<h2>Subtotal: "+verificarSubtotal()+" ₯</h2>");
        formatarCarrinho();
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

function calcMaxItens() {

    let larguraTela;
    larguraTela = screen.width * window.devicePixelRatio;


    let maxItens = 0;

    if (larguraTela >= 1920) {
        maxItens = 5;
    } else if (larguraTela >= 1440) {
        maxItens = 4;
    } else if (larguraTela >= 600) {
        maxItens = 2;
    } else {
        maxItens = 1;
    }

    return maxItens;
}

function construirRows(itens) {

    let maxItens = calcMaxItens();

    let qtdeRows = Math.round((itens+1)/maxItens);
    if (qtdeRows <= 0) {
        qtdeRows = 1;
    }

    for (let cont=1; cont<=qtdeRows; cont++) {
        $("#cartContainer").append("<div id='row-"+cont+"' class='cardRow'></div>");
    }
}

function agruparPedidos(itens) {

    let maxItens = calcMaxItens();

    for (let i = 1; i <= maxItens; i++) {
        if (itens < i * maxItens) {
            return i;
        }
    }
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

                construirRows(retorno.length);
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

function formatarCarrinho() {

    setTimeout(()=> {
    if (!$(".cardRow").length || $(".cardRow").html() == "") {
        $("#pedidoBox").remove();
        $("body").css({
            "min-height": "100vh",
        });
        $("#cartContainer").css({
            "color": "white",
            "margin-top": "25vh"
        });
        $("#cartContainer").html(
            "<h1>Carrinho Vazio</h1>"
           +"<p>Selecione um cupom para realizar um pedido.</p>"
        );
    } else if ($("#pedidoBox").length == 0) {
        $("body").append(
            "<div id='pedidoBox'>"
            +"<div id='saldoPedido'><h2>Subtotal:  ₯</h2></div>"
            +"<div id='btnPedido' onclick='finalizarPedido();'>Finalizar pedido</div>"
            +"</div>"
        );
        $("#saldoPedido").html("<h2>Subtotal: "+verificarSubtotal()+" ₯</h2>");
    }
    }, 500);

}