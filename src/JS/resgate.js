
function finalizarPedido() {

    let itensCarrinho = Array.from($(".carrinhoCard"));

    if (itensCarrinho.length > 0) {
        // map == cria um novo array
        // verifica cada elemento dos itens carrinho e armazena o valor de seus data-id
        let idResgatados = itensCarrinho.map(element => $(element).data("id"));

        alert(idResgatados.join(", "));

        $.post(
            "./src/PHP/resgate.php",
                {
                    idCards: idResgatados
                }
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);

            }
        )
    }
}