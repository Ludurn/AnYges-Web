
function voltarFiltros() {
    $('#filtroBox').html(
                   "<div id='filtro-1' class='filtros'>"
                +"<div id='btnFiltro1' class='btnFiltros' onclick=''>"
                    +"<div class='imgFiltros'>"
                        +"<img src='./src/imgs/icons/imgMedicamento.png' alt='medicamento' style='width: 100%;'/>"
                    +"</div>"
                +"</div>"
                +"<p class='nomeFiltro'>Medicamentos</p>"
            +"</div>"
            +"<div id='filtro-2' class='filtros'>"
                +"<div id='btnFiltro2' class='btnFiltros' onclick=''>"
                    +"<div class='imgFiltros'>"
                        +"<img src='./src/imgs/icons/imgConsulta.png' alt='consulta' style='width: 100%;'/>"
                    +"</div>"
                +"</div>"
                +"<p class='nomeFiltro'>Consultas</p>"
            +"</div>"
            +"<div id='filtro-3' class='filtros'>"
                +"<div id='btnFiltro3' class='btnFiltros' onclick=''>"
                    +"<div class='imgFiltros'>"
                        +"<img src='./src/imgs/icons/imgHigiene.png' alt='beleza/higiene' style='width: 100%;'/>"
                    +"</div>"
                +"</div>"
                +"<p class='nomeFiltro'>Beleza e Higiene</p>"
            +"</div>"
    );

    $("#btnFiltro1").attr('onclick', "carregarCatalogoFiltro('medicamento'); chamarCarrinho();");
    $("#btnFiltro2").attr('onclick', "carregarCatalogoFiltro('consulta'); chamarCarrinho();");
    $("#btnFiltro3").attr('onclick', "carregarCatalogoFiltro('beleza/higiene'); chamarCarrinho();");
}

function resetarFiltro(filtro) {

    if (filtro == "medicamento") {
        $('#filtro-1').replaceWith("<div id='filtro-0' class='filtros'>"
                +"<div id='btnFiltro0' class='btnFiltros' onclick='carregarCatalogo(); chamarCarrinho();'>"
                +"<div class='imgFiltros'>"
                +"<img src='./src/imgs/icons/imgMedicamento.png' alt='medicamento' style='width: 100%;'/>"
                +"</div>"
                +"</div>"
                +"<p class='nomeFiltro'>Sem filtro</p>"
                +"</div>");
    } else if (filtro == "consulta") {
        $('#filtro-2').replaceWith("<div id='filtro-0' class='filtros'>"
            +"<div id='btnFiltro0' class='btnFiltros' onclick='carregarCatalogo(); chamarCarrinho();'>"
            +"<div class='imgFiltros'>"
            +"<img src='./src/imgs/icons/imgConsulta.png' alt='consulta' style='width: 100%;'/>"
            +"</div>"
            +"</div>"
            +"<p class='nomeFiltro'>Sem filtro</p>"
            +"</div>");
    } else if (filtro == "beleza/higiene") {
        $('#filtro-3').replaceWith("<div id='filtro-0' class='filtros'>"
            +"<div id='btnFiltro0' class='btnFiltros' onclick='carregarCatalogo(); chamarCarrinho();'>"
            +"<div class='imgFiltros'>"
            +"<img src='./src/imgs/icons/imgHigiene.png' alt='beleza/higiene' style='width: 100%;'/>"
            +"</div>"
            +"</div>"
            +"<p class='nomeFiltro'>Sem filtro</p>"
            +"</div>");
    }
}



function construirCupom(fileira, retorno, indice) {
    $("#fileira-"+fileira).append(
        "<article class='produtos'>"
        +"<div id='idProduto'>"+retorno[indice]['ID_cupom']+"</div>"
        +"<div class='molduraProdutos'>"
        +"<figure>"
        +"<img src='"+retorno[indice]['imagem']+"' id='imgProduto' class='imgProdutos' alt='"+retorno[indice]['nome_cupom']+"' width='100%' />"
        +"</figure>"
        +"</div>"
         +"<p id='nomeProduto'>"+retorno[indice]['nome_cupom']+"</p>"
         +"<h4 id='fornecedorProduto'>"+retorno[indice]['nome_associacao']+"</h4>"
         +"<p id='descricaoProduto' class='descricaoProdutos'>"+retorno[indice]['descricao_cupom']+"</p>"
         +"<p>Desconto de <strong>"+retorno[indice]['desconto']+"%</strong></p>"                        
         +"<div id='btnProduto' class='btnProdutos'>"+retorno[indice]['valor']+" ₯</div>"
         +"</article>"
    );
}

function agruparCupons(itens) {

    if (larguraTela >= 1920) {
        if (itens < 6) {
            return 1;
        } else if (itens >= 6) {
            return 2;
        } else if (itens >= 12) {
            return 3;
        } else if (itens >= 18) {
            return 4;
        } else if (itens >= 24) {
            return 5;
        } else if (itens >= 30) {
            return 6;
        }
    } else if (larguraTela >= 1440) {
        if (itens < 5) {
            return 1;
        } else if (itens >= 5) {
            return 2;
        } else if (itens >= 10) {
            return 3;
        } else if (itens >= 15) {
            return 4;
        } else if (itens >= 20) {
            return 5;
        } else if (itens >= 25) {
            return 6;
        }
    } else {
        if (itens < 4) {
            return 1;
        } else if (itens >= 4) {
            return 2;
        } else if (itens >= 8) {
            return 3;
        } else if (itens >= 12) {
            return 4;
        } else if (itens >= 18) {
            return 5;
        } else if (itens >= 22) {
            return 6;
        }
    }
}

function exibirCatalogo() {
    setTimeout(() => {
        $(".fileiras").css(
            {
                "visibility": "visible",
                "opacity": "1",
                "transition": "visibility 0s, opacity 0.2s linear"
        });
    }, 200);
}

function carregarCatalogo() {

    let fileira=1;
    let itens=0;

    voltarFiltros();
    limparCatalogo();

    $.post(
        "./src/PHP/catalogo.php"
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            for (let i=0; i<retorno.length; i++) {
                construirCupom(fileira, retorno, i);
                itens++;
                fileira = agruparCupons(itens, fileira);
            }
            exibirCatalogo();
        }
    )
}


function carregarCatalogoFiltro(nomeFiltro) {
    
    let fileira=1;
    let itens=0;

    voltarFiltros();
    limparCatalogo();

    $.post(
        "./src/PHP/catalogoFiltro.php",
            {
                filtro: nomeFiltro
            }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            for (let i=0; i<retorno.length; i++) {
                construirCupom(fileira, retorno, i);
                itens++;
                fileira = agruparCupons(itens, fileira);
            }
            resetarFiltro(nomeFiltro);
            exibirCatalogo();
        }
    )
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
            }
        );
}
