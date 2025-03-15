let idPesquisa = [];
let indicePesquisa = 0;
let pesquisaAnterior, redirecionado;

function exibirPesquisa(fileira) {

    if (idPesquisa.length>indicePesquisa) {
        $.post(
            "./src/PHP/catalogoPesquisa.php",
            {
                idPesquisa: idPesquisa,
                indicePesquisa: indicePesquisa
            }
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);
    
    
                if (retorno['message'] == "sem registro") {
    
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
                    
                    indicePesquisa++;
                    itens++;
    
                    // Estrutura para pular para prox fileiras

                    if (larguraTela >= 1920) {
                        if (itens <= 6) {
                            exibirPesquisa(1);
                            setTimeout(() => {
                                exibirCatalogo();
                            }, 100)
                        } else if (itens <= 12) {
                            exibirPesquisa(2);
                        } else if (itens <= 18) {
                            exibirPesquisa(3);
                            exibirCatalogo();
                        } else if (itens <= 24) {
                            exibirPesquisa(4);
                        } else if (itens <= 30) {
                            exibirPesquisa(5);
                        } else if (itens <= 36) {
                            exibirPesquisa(6);
                        }
                    } else if (larguraTela >= 1440) {
                        if (itens <= 5) {
                            exibirPesquisa(1);
                            setTimeout(() => {
                                exibirCatalogo();
                            }, 100)
                        } else if (itens <= 10) {
                            exibirPesquisa(2);
                        } else if (itens <= 15) {
                            exibirPesquisa(3);
                            exibirCatalogo();
                        } else if (itens <= 20) {
                            exibirPesquisa(4);
                        } else if (itens <= 25) {
                            exibirPesquisa(5);
                        } else if (itens <= 30) {
                            exibirPesquisa(6);
                        }
                    } else {
                        if (itens <= 4) {
                            exibirPesquisa(1);
                            setTimeout(() => {
                                exibirCatalogo();
                            }, 100)
                        } else if (itens <= 8) {
                            exibirPesquisa(2);
                        } else if (itens <= 12) {
                            exibirPesquisa(3);
                            exibirCatalogo();
                        } else if (itens <= 16) {
                            exibirPesquisa(4);
                        } else if (itens <= 20) {
                            exibirPesquisa(5);
                        } else if (itens <= 24) {
                            exibirPesquisa(6);
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
    } else {
        indicePesquisa=0;
        itens=0;
    }
}

function resetarPesquisa() {
    limparCatalogo();
    $("#fileira-1").append(
                "<div id='filtro-0' class='filtros' style='width: 100%;'>"
                +"<h2>Cupom não encontrado</h2>"
                +"<div id='btnRecarregar' class='btnFiltros' onclick='limparCatalogo(); carregarCatalogo(1); voltarFiltros();'>"
                +"<div class='imgFiltros'>"
                +"<img src='./src/imgs/icons/load.png' alt='recarregar' style='width: 100%;'/>"
                +"</div>"
                +"</div>"
                +"</div>"
    );
    setTimeout(() => {
        exibirCatalogo();
    }, 100);
}


function pesquisar(ativar) {
    if (ativar == "sim" || event.key === 'Enter') {
        let pesquisa = $('#inputSearch').val();
        if (pesquisa == "") {
            resetarPesquisa();
        } else {
            $.post(
                "./src/PHP/idPesquisa.php",
                {
                    pesquisa: pesquisa
                }
            )
            .done(
                function (retorno) {
                    retorno = JSON.parse(retorno);
                    idPesquisa = retorno;
                    if (idPesquisa.length>0) {
                        limparCatalogo();
                        exibirPesquisa(1);
                    } else {
                        resetarPesquisa();
                    }
                }
            )
            .fail (
                function (cod, textStatus, msg) {
                    alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
                }
            );
        }
    }
}

function pesquisarMobile(ativar) {
    if (ativar == "sim" || event.key === 'Enter') {
        let pesquisa = $('#inputSearchMobile').val();
        if (pesquisa == "") {
            resetarPesquisa();
        } else {
            $.post(
                "./src/PHP/idPesquisa.php",
                {
                    pesquisa: pesquisa
                }
            )
            .done(
                function (retorno) {
                    retorno = JSON.parse(retorno);
                    idPesquisa = retorno;
                    if (idPesquisa.length>0) {
                        limparCatalogo();
                        exibirPesquisa(1);
                    } else {
                        resetarPesquisa();
                    }
                }
            )
            .fail (
                function (cod, textStatus, msg) {
                    alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
                }
            );
        }
    }
}

function redirecionarPesquisa() {
    if (event.key === 'Enter') {
        pesquisaAnterior = $('#inputSearch').val();
        redirecionado = "sim";
        localStorage.setItem("redirecionado", redirecionado);
        localStorage.setItem("pesquisaAnterior", JSON.stringify(pesquisaAnterior));
        window.location.replace("./home.html");
    }

    if (localStorage.getItem("redirecionado") == "sim") {
        cancelarCatalogo = true;
        pesquisaAnterior = JSON.parse(localStorage.getItem("pesquisaAnterior"));
       setTimeout(() => {
            $('#inputSearch').val(pesquisaAnterior);
            localStorage.clear();
            pesquisar("sim");
       }, 100)
    }
}

function redirecionarPesquisaMobile(ativar) {
    if (ativar == "sim" || event.key === 'Enter') {
        pesquisaAnterior = $('#inputSearchMobile').val();
        redirecionado = "sim";
        localStorage.setItem("redirecionado", redirecionado);
        localStorage.setItem("pesquisaAnterior", JSON.stringify(pesquisaAnterior));
        window.location.replace("./home.html");
    }

    if (localStorage.getItem("redirecionado") == "sim") {
        cancelarCatalogo = true;
        pesquisaAnterior = JSON.parse(localStorage.getItem("pesquisaAnterior"));
       setTimeout(() => {
            $('#inputSearchMobile').val(pesquisaAnterior);
            localStorage.clear();
            pesquisar("sim");
       }, 100)
    }
}

