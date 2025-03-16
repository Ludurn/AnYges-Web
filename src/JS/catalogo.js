let itens=1;
let itensFiltro=1;
let fileira=1;
let id, indice=0;
let idFiltro = [];
let cancelarCatalogo = false;
let larguraTela;

larguraTela = screen.width * window.devicePixelRatio;

function voltarFiltros() {
    $('#filtroBox').html(
                   "<div id='filtro-1' class='filtros'>"
                +"<div id='btnFiltro1' class='btnFiltros' onclick=''>"
                    +"<div class='imgFiltros'>"
                        +"<img src='./src/imgs/icons/imgHigiene.png' alt='medicamento' style='width: 100%;'/>"
                    +"</div>"
                +"</div>"
                +"<p>Medicamentos</p>"
            +"</div>"
            +"<div id='filtro-2' class='filtros'>"
                +"<div id='btnFiltro2' class='btnFiltros' onclick=''>"
                    +"<div class='imgFiltros'>"
                        +"<img src='./src/imgs/icons/imgHigiene.png' alt='medicamento' style='width: 100%;'/>"
                    +"</div>"
                +"</div>"
                +"<p>Consultas</p>"
            +"</div>"
            +"<div id='filtro-3' class='filtros'>"
                +"<div id='btnFiltro3' class='btnFiltros' onclick=''>"
                    +"<div class='imgFiltros'>"
                        +"<img src='./src/imgs/icons/imgHigiene.png' alt='medicamento' style='width: 100%;'/>"
                    +"</div>"
                +"</div>"
                +"<p>Beleza e Higiene</p>"
            +"</div>"
    );

    $("#btnFiltro1").attr('onclick', "limparCatalogo(); gerarIdFiltro('medicamento'); chamarCarrinho('filteron');");
    $("#btnFiltro2").attr('onclick', "limparCatalogo(); gerarIdFiltro('consulta'); chamarCarrinho('filteron');");
    $("#btnFiltro3").attr('onclick', "limparCatalogo(); gerarIdFiltro('beleza'); chamarCarrinho('filteron');");
}

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

    if (filtro == "medicamento") {
        voltarFiltros();
        $('#filtro-1').replaceWith("<div id='filtro-0' class='filtros'>"
                +"<div id='btnFiltro0' class='btnFiltros' onclick='limparCatalogo(); carregarCatalogo(1); voltarFiltros(); chamarCarrinho();'>"
                +"<div class='imgFiltros'>"
                +"<img src='./src/imgs/icons/imgHigiene.png' alt='medicamento' style='width: 100%;'/>"
                +"</div>"
                +"</div>"
                +"<p>Sem filtro</p>"
                +"</div>");
    } else if (filtro == "consulta") {
        voltarFiltros();
        $('#filtro-2').replaceWith("<div id='filtro-0' class='filtros'>"
            +"<div id='btnFiltro0' class='btnFiltros' onclick='limparCatalogo(); carregarCatalogo(1); voltarFiltros(); chamarCarrinho();'>"
            +"<div class='imgFiltros'>"
            +"<img src='./src/imgs/icons/imgHigiene.png' alt='medicamento' style='width: 100%;'/>"
            +"</div>"
            +"</div>"
            +"<p>Sem filtro</p>"
            +"</div>");
    } else if (filtro == "beleza") {
        voltarFiltros();
        $('#filtro-3').replaceWith("<div id='filtro-0' class='filtros'>"
            +"<div id='btnFiltro0' class='btnFiltros' onclick='limparCatalogo(); carregarCatalogo(1); voltarFiltros(); chamarCarrinho();'>"
            +"<div class='imgFiltros'>"
            +"<img src='./src/imgs/icons/imgHigiene.png' alt='medicamento' style='width: 100%;'/>"
            +"</div>"
            +"</div>"
            +"<p>Sem filtro</p>"
            +"</div>");
    }
    
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

    if (cancelarCatalogo) {
        return;
    }

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
                    if (larguraTela >= 1920) {
                        if (itens <= 6) {
                            carregarCatalogo(1);
                        } else if (itens <= 12) {
                            carregarCatalogo(2);
                        } else if (itens <= 18) {
                            carregarCatalogo(3);
                            exibirCatalogo();
                        } else if (itens <= 24) {
                            carregarCatalogo(4);
                        } else if (itens <= 30) {
                            carregarCatalogo(5);
                        } else if (itens <= 36) {
                            carregarCatalogo(6);
                        }
                    } else if (larguraTela >= 1440) {
                        if (itens <= 5) {
                            carregarCatalogo(1);
                        } else if (itens <= 10) {
                            carregarCatalogo(2);
                        } else if (itens <= 15) {
                            carregarCatalogo(3);
                            exibirCatalogo();
                        } else if (itens <= 20) {
                            carregarCatalogo(4);
                        } else if (itens <= 25) {
                            carregarCatalogo(5);
                        } else if (itens <= 30) {
                            carregarCatalogo(6);
                        }
                    } else {
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
                    if (larguraTela >= 1920) {
                        if (itensFiltro <= 6) {
                            carregarCatalogoFiltro(1, filtro);
                        } else if (itensFiltro <= 12) {
                            carregarCatalogoFiltro(2, filtro);
                        } else if (itensFiltro <= 18) {
                            carregarCatalogoFiltro(3, filtro);
                            exibirCatalogo();
                        } else if (itensFiltro <= 24) {
                            carregarCatalogoFiltro(4, filtro);
                        } else if (itensFiltro <= 30) {
                            carregarCatalogoFiltro(5, filtro);
                        } else if (itensFiltro <= 36) {
                            carregarCatalogoFiltro(6, filtro);
                        }
                    } else if (larguraTela >= 1440) {
                        if (itensFiltro <= 5) {
                            carregarCatalogoFiltro(1, filtro);
                        } else if (itensFiltro <= 10) {
                            carregarCatalogoFiltro(2, filtro);
                        } else if (itensFiltro <= 15) {
                            carregarCatalogoFiltro(3, filtro);
                            exibirCatalogo();
                        } else if (itensFiltro <= 20) {
                            carregarCatalogoFiltro(4, filtro);
                        } else if (itensFiltro <= 25) {
                            carregarCatalogoFiltro(5, filtro);
                        } else if (itensFiltro <= 30) {
                            carregarCatalogoFiltro(6, filtro);
                        }
                    } else {
                        if (itensFiltro <= 4) {
                            carregarCatalogoFiltro(1, filtro);
                        } else if (itensFiltro <= 8) {
                            carregarCatalogoFiltro(2, filtro);
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
        cancelarCatalogo = false;
}
