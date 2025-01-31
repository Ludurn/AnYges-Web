let ativacao = false;

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

let catalogoProdutos = document.getElementsByClassName("btnProdutos");

/* alert (produto1.innerHTML);

produto1.addEventListener("click", function() {
    // window.alert("Este é o elemento " + this.textContent + "!");
    alert("olá mundo");
}); */

/* function meAjuda() {
    window.alert("Este é o elemento " + this + "!");
} */

for (i = 0; i < catalogoProdutos.length; i++) {
    catalogoProdutos[i].addEventListener("click", function() {
        console.log("Este é o elemento:\n", event.target);
    });
}