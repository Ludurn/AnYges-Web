
let pesquisaAnterior, redirecionado;

function carregarPesquisa(textoPesquisa) {

    let fileira=1;
    let itens=0;

    setTimeout(() => {
        voltarFiltros();
        limparCatalogo();

        $.post(
            "./src/PHP/catalogoPesquisa.php",
            {
                pesquisa: textoPesquisa
            }
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);
                if (retorno != "sem registro") {
                    let pntUser = $("#pontosUser").text().slice(0, -2);
                    for (let i=0; i<retorno.length; i++) {
                        construirCupom(fileira, retorno, i, pntUser);
                        itens++;
                        fileira = agruparCupons(itens, fileira);
                    }
                    exibirCatalogo();
                } else {
                    resetarPesquisa();
                }
            }
        )
    }, 200);

}

function resetarPesquisa() {


    setTimeout(() => {
        limparCatalogo();
        $("#fileira-1").append(
                "<div id='filtro-0' class='filtros' style='width: 100%;'>"
                +"<h2>Cupom não encontrado</h2>"
                +"<div id='btnRecarregar' class='btnFiltros' onclick='carregarCatalogo(); chamarCarrinho();'>"
                +"<div class='imgFiltros'>"
                +"<img src='./src/imgs/icons/load.png' alt='recarregar' style='width: 100%;'/>"
                +"</div>"
                +"</div>"
                +"</div>"
        );

        exibirCatalogo();
    }, 200);
}


function pesquisar(ativar) {
    if (ativar == "sim" || event.key === 'Enter') {
        let pesquisa = $('#inputSearch').val();
        if (pesquisa == "") {
            resetarPesquisa();
        } else {
            carregarPesquisa(pesquisa);
            chamarCarrinho();
        }
    }
}

function pesquisarMobile(ativar) {
    if (ativar == "sim" || event.key === 'Enter') {
        let pesquisa = $('#inputSearchMobile').val();
        if (pesquisa == "") {
            resetarPesquisa();
        } else {
            carregarPesquisa(pesquisa);
            chamarCarrinho();
        }
    }
}

function redirecionarPesquisa(ativar) {
    if (ativar == "sim" || event.key === 'Enter') {
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

