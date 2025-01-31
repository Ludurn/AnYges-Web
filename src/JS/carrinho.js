let ativacao = false;
var carrinho = document.getElementById("cartContainer");

// Ativação/desativação do carrinho

function ativarCarrinho() {
    ativacao = !ativacao;

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

// Inserção/Remoção dos cards de produtos do carrinho

var catalogoProdutos = document.getElementsByClassName("btnProdutos");

// console.log(catalogoProdutos[1].innerHTML);

// var colecaoCarrinho = document.get;
for (i = 0; i < catalogoProdutos.length; i++) {
    catalogoProdutos[i].addEventListener("click", function() {
        var target = event.target;
        var cardCarrinho = target.parentElement;
        cardCarrinho.removeChild(cardCarrinho.lastElementChild);
        carrinho.innerHTML += "<div style = 'display: flex;" + 
        " align-items: center;" + 
        " background-color: white;" + 
        " width: 140%; " +
        " transform: scale(0.7, 0.7);'>" + 
        cardCarrinho.innerHTML + 
        "</div>";
    });
}