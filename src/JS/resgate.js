
function finalizarPedido() {

    let itensCarrinho = Array.from($(".carrinhoCard"));

    if (itensCarrinho.length > 0) {

        if (confirm("Deseja finalizar o pedido?") == true) {

            // map == cria um novo array
            // verifica cada elemento dos itens carrinho e armazena o valor de seus data-id
            let idResgatados = itensCarrinho.map(element => $(element).data("id"));

            $.post(
                "./src/PHP/resgate.php",
                    {
                        idCards: idResgatados
                    }
            )
            .done(
                function (retorno) {
                    retorno = JSON.parse(retorno);
                    
                    if (retorno == "sucesso") {
                        window.location.replace("./home.html");
                    } else if (retorno == "pontuacao insuficiente") {
                        alert("Pontuação insuficiente para efetuar o pedido.");
                    } else if (retorno == "desconectado") {
                        alert("Para efetuar o pedido é necessário estar conectado a uma conta.");
                        window.location.replace("./index.html");
                    }
                }
            )
        }

    } else {
        alert("Selecione um cupom para efetuar um pedido.");
    }
}