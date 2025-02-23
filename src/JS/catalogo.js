let itens=1;
let itensFiltro=1;
let fileira=1;
let id, indice=0;
let idFiltro = [];

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

function gerarIdFiltro(filtro) {
    $.post(
        "./src/PHP/idRandomFiltro.php",
        {
            filtro: filtro
        }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            idFiltro = retorno;
            carregarCatalogoFiltro(fileira, filtro);
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
                        +"<img src='"+retorno['imagem']+"' id='imgProduto' class='imgProdutos' alt='"+retorno['nome_cupom']+"' width='100%' />"
                        +"</figure>"
                        +"</div>"
                         +"<p id='nomeProduto'>"+retorno['nome_cupom']+"</p>"
                         +"<h4 id='fornecedorProduto'>"+retorno['associacao']+"</h4>"
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

function carregarCatalogoFiltro(fileira, filtro) {

    indice = Math.floor(Math.random() * idFiltro.length);

    setTimeout(() => {

        $.post(
            "./src/PHP/catalogoFiltro.php",
            {
                idFiltro: idFiltro,
                indice: indice
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
                        +"<img src='"+retorno['imagem']+"' id='imgProduto' class='imgProdutos' alt='"+retorno['nome_cupom']+"' width='100%' />"
                        +"</figure>"
                        +"</div>"
                         +"<p id='nomeProduto'>"+retorno['nome_cupom']+"</p>"
                         +"<h4 id='fornecedorProduto'>"+retorno['associacao']+"</h4>"
                         +"<p id='descricaoProduto' class='descricaoProdutos'>"+retorno['descricao']+"</p>"
                         +"<div id='btnProduto' class='btnProdutos'>"+retorno['valor']+" ₯</div>"
                         +"</article>"
                    );
                    
                    itens++;
                    itensFiltro++;


        
                    // Estrutura para pular para prox fileiras
                    if (itensFiltro <= 4) {
                        carregarCatalogoFiltro(1, filtro);
                    } else if (itensFiltro <= 8) {
                        carregarCatalogoFiltro(2, filtro)
                    } else if (itensFiltro <= 12) {
                        carregarCatalogoFiltro(3, filtro);
                        exibirCatalogo();
                    } else if (itensFiltro <= 16) {
                        carregarCatalogoFiltro(4, filtro);
                    } else if (itensFiltro <= 20) {
                        carregarCatalogoFiltro(5, filtro);
                    } else if (itensFiltro <= 24) {
                        carregarCatalogoFiltro(6, filtro);
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

function limparCatalogo() {
        for (let i=1; i<=6; i++) {
            $("#fileira-"+i).html("");
        }
        $(".fileiras").css(
            {
                "visibility": "hidden",
                "opacity": "0",
                "transition": "visibility 0s, opacity 0.2s linear"
        });
        itens=1;
        itensFiltro=1;
}
