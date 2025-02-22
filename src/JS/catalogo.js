let itens=1;
let fileira=1;
let id;

function gerarId() {
    $.post(
        "./src/PHP/idRandom.php",
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            id = retorno;
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );
}

function exibirCatalogo() {

        $(".fileiras").css(
            {
                "visibility": "visible",
                "opacity": "1",
                "transition": "visibility 0s, opacity 0.2s linear"
        });

}

function carregarCatalogo(fileira) {

    gerarId();

    setTimeout(() => {

        $.post(
            "./src/PHP/catalogo.php",
            {
                id: id
            }
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);
    
                if (retorno['message'] == "sem registro") {
                    carregarCatalogo();
                } else {
                    $("#fileira-"+fileira).append(
                        "<article class='produtos'>"
                        +"<div class='molduraProdutos'>"
                        +"<figure>"
                        +"<img src='"+retorno['imagem']+"' id='imgProduto' class='imgProdutos' alt='rivotril em gotas' width='100%' />"
                        +"</figure>"
                        +"</div>"
                         +"<p id='nomeProduto'>"+retorno['nome_cupom']+"</p>"
                         +"<h4 id='fornecedorProduto'>"+retorno['tipo']+"</h4>"
                         +"<p id='descricaoProduto' class='descricaoProdutos'>"+retorno['descricao']+"</p>"
                         +"<div id='btnProduto' class='btnProdutos'>"+retorno['valor']+" ₯</div>"
                         +"</article>"
                    );
        
                    itens++;
                    id++;
        
                    // Estrutura para pular para prox fileiras
                    if (itens <= 4) {
                        carregarCatalogo(1);
                    } else if (itens <= 8) {
                        carregarCatalogo(2);
                    } else if (itens <= 12) {
                        carregarCatalogo(3);
                        exibirCatalogo();
                    } else if (itens <= 16) {
                        carregarCatalogo(4);
                    } else if (itens <= 20) {
                        carregarCatalogo(5);
                    } else if (itens <= 24) {
                        carregarCatalogo(6);
                    }
                }
            }
        )
        .fail (
            function (cod, textStatus, msg) {
                alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
            }
        );

    }, 100)
}
