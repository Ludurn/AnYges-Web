function aparecerBtnCompra(btn) {
    $("#"+btn).fadeIn();
}
function desaparecerBtnCompra(btn) {
    $("#"+btn).fadeOut();
}

function carregarCatalogo() {

    $.post(
            "carregarProdutos.php"
        )
    .done(
        function(retorno) {
                //JSON.parse(retorno);
                alert (retorno);
                $("#catalogo").html(
                    "<article class='produtos' onmouseover='aparecerBtnCompra('btnProduto');' onmouseleave='desaparecerBtnCompra('btnProduto')'>"
                    +"<div class='molduraProdutos'>"
                    +"<figure>"
                    +"<img src='imagens/rivotril.png' id='imgProduto' class='imgProdutos' alt='rivotril em gotas' width='100%' />"
                    +"</figure>"
                    +"</div>"
                     +"<p id='nomeProduto'>Rivotril Gotas 2,5mg</p>"
                     +"<h4 id='fornecedorProduto'>Promofarma</h4>"
                     +"<p id='descricaoProduto' class='descricaoProdutos'>Suspensão Oral <br/> 20ml</p>"
                     +"<div id='btnProduto' class='btnProdutos'>3500 ₯</div>"
                     +"</article>"
                );
        }, "json"
    )
    .fail(
        function(cod, textStatus, msg) {
            alert("Error: "+cod+"\n"+textStatus+"\n"+msg);
        }
    )
}