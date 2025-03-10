let ativacao = false;
var carrinho = document.getElementById("cartContainer");
var cardPresente = false;
var contador = 0;
var aposPrimeiro = false;
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
function chamarCarrinho() {
    setTimeout(() => {
        var catalogoProdutos = document.getElementsByClassName("btnProdutos");
        alert(catalogoProdutos[0].parentElement.innerHTML);
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
            contador++;
            });
        }
    }, 4000);
}