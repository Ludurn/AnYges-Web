// VARIAVEIS GLOBAIS

let larguraTela;

larguraTela = screen.width * window.devicePixelRatio;

// FUNCOES PAGINA 'PERFIL'

function tabDadosLoader() {
    $.post(
        "./src/PHP/tabDados.php",
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);

            $("#pfpImg").attr("src", "./src/imgs/pfp.png");
            $("#infoUserTitle").text("Olá, "+retorno['nome']);
            $("#infoNome").text(retorno['nome']);
            $("#infoSobrenome").text(retorno['sobrenome']);
            $("#infoCPF").text(retorno['cpf']);
            $("#infoEmail").text(retorno['email']);
            $("#infoNasc").text(retorno['nascimento']);
            $("#infoTel").text(retorno['tel']);

            $('#infoCPF').mask('000.000.000-00');
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );
}

function construirHistPedido(retorno, indice) {
    $("#pedido-tbody").prepend(
        "<tr class='pedido-rows'>"
       +"<td>"+retorno[indice]['ID_pedido']+"</td>"
       +"<td>"+retorno[indice]['dt_pedido']+"</td>"
       +"<td>"+retorno[indice]['valor_pedido']+" ₯</td>"
       +"<td class='pdf-td'><a href='./src/PHP/criarPedidoPDF.php?num_pedido="+retorno[indice]['ID_pedido']+"' target='_blank'><figure class='pdf-icon'><img src='./src/imgs/icons/pdf_icon.png' style='width: 100%;' /></figure></a></td>"
       +"</tr>"
    );
}

function tabPedLoader() {
    $.post(
        "./src/PHP/tabPedido.php",
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno)
            if (retorno == "Sem registro") {
                $("#pedidos-box").css({
                    "display": "flex",
                    "text-align": "center",
                    "align-items": "center",
                    "justify-content": "center",
                    "min-height": "25vh"
                });
                $("#pedidos-box").html("<p>Nenhum pedido registrado até o momento.<br/><br/>Assim que você realizar seu primeiro pedido, ele aparecerá aqui. </p>");
            } else {
                $("#pedido-tbody").html("");

                for (let loop=0; loop<retorno.length; loop++) {
                    construirHistPedido(retorno, loop);
                }
            }
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );
}

function tabVerificar() {
    if ($("#perfilInfoBox").css('visibility') === 'visible') {
        return "infoBox";
    } else if ($("#perfilCupomBox").css('visibility') === 'visible') {
        return "cupomBox";
    } else if ($("#perfilHistPedBox").css('visibility') === 'visible') {
        return "pedBox";
    }
}

function tabDadosStyle() {
        let verifique = tabVerificar();
        let delay = "0";

        if (verifique == "pedBox") {
            tabPedStyle();
            delay = "200"; 
        } else if (verifique == "cupomBox") {
            tabCupomStyle();
            delay = "200"; 
        }

        setTimeout(() => {
            if ($("#perfilInfoBox").css('visibility') === 'hidden') {
                    
                $("#tabDados").css({
                        "border-left":"0.2rem #611f1f solid"
                    });
                $("#perfilInfoBox").css(
                    {
                        "display": "flex"
                    });
                $("#perfilTitle").html("<h1 style='text-align: center;'>Dados pessoais</h1>");
                setTimeout(() => {
                    $("#perfilTitle").css(
                        {
                            "visibility": "visible",
                            "opacity": "1",
                            "transition": "visibility 0s, opacity 0.2s linear"
                    });
                    $("#perfilInfoBox").css(
                        {
                            "visibility": "visible",
                            "opacity": "1",
                            "transition": "visibility 0s, opacity 0.2s linear"
                         });
                    }, 100);                
            } else {
                $("#tabDados").css({
                    "border-left":"rgba(128, 128, 128, 0.39) solid"
                });

                $("#perfilTitle").css({
                    "opacity": "0",
                    "transition": "visibility 0s, opacity 0.2s linear"
                });
                $("#perfilInfoBox").css(
                    {
                        "opacity": "0",
                        "transition": "visibility 0s, opacity 0.2s linear"
                    });
                setTimeout(() => {
                        $("#perfilTitle").css(
                            {
                                "visibility":"hidden"
                        });
                        $("#perfilInfoBox").css(
                            {
                                "visibility": "hidden",
                                "display": "none"
                            });
                    }, 200);
            }
        }, delay);
}

function tabPedStyle() {
    let verifique = tabVerificar();
    let delay = "0";

    
    if (verifique == "infoBox") {
        tabDadosStyle();
        delay = "200"; 
    } else if (verifique == "cupomBox") {
        tabCupomStyle();
        delay = "200"; 
    }


    setTimeout(() => {
        if ($("#perfilHistPedBox").css('visibility') === 'hidden') {

                $("#tabHistPed").css({
                    "border-left":"0.2rem #611f1f solid"
                });

            $("#perfilHistPedBox").css(
                {
                    "display": "flex"
                });
            $("#perfilTitle").html("<h1 style='text-align: center;'>Histórico de Pedidos</h1>");                
            setTimeout(() => {
                $("#perfilTitle").css(
                    {
                        "visibility": "visible",
                        "opacity": "1",
                        "transition": "visibility 0s, opacity 0.2s linear"
                });
                $("#perfilHistPedBox").css(
                    {
                        "visibility": "visible",
                        "opacity": "1",
                        "transition": "visibility 0s, opacity 0.2s linear"
                     });
                }, 100);                
        } else {

            $("#tabHistPed").css({
                "border-left":"rgba(128, 128, 128, 0.39) solid"
            });

            $("#perfilTitle").css({
                "opacity": "0",
                "transition": "visibility 0s, opacity 0.2s linear"
            });
            $("#perfilHistPedBox").css(
                {
                    "opacity": "0",
                    "transition": "visibility 0s, opacity 0.2s linear"
                });
            setTimeout(() => {
                    $("#perfilTitle").css(
                        {
                            "visibility":"hidden"
                    });
                    $("#perfilHistPedBox").css(
                        {
                            "visibility": "hidden",
                            "display": "none"
                        });
                    
                }, 200);
        }
    }, delay);
}

function tabCupomStyle() {
    let verifique = tabVerificar();
    let delay = "0";

    if (verifique == "pedBox") {
        tabPedStyle();
        delay = "200"; 
    } else if (verifique == "infoBox") {
        tabDadosStyle();
        delay = "200"; 
    }


    setTimeout(() => {
        if ($("#perfilCupomBox").css('visibility') === 'hidden') {

                $("#tabCupom").css({
                    "border-left":"0.2rem #611f1f solid"
                });

            $("#perfilCupomBox").css(
                {
                    "display": "flex"
                });
            $("#perfilTitle").html("<h1 style='text-align: center;'>Cupons</h1>");                
            setTimeout(() => {
                $("#perfilTitle").css(
                    {
                        "visibility": "visible",
                        "opacity": "1",
                        "transition": "visibility 0s, opacity 0.2s linear"
                });
                $("#perfilCupomBox").css(
                    {
                        "visibility": "visible",
                        "opacity": "1",
                        "transition": "visibility 0s, opacity 0.2s linear"
                     });
                }, 100);                
        } else {

            $("#tabCupom").css({
                "border-left":"rgba(128, 128, 128, 0.39) solid"
            });

            $("#perfilTitle").css({
                "opacity": "0",
                "transition": "visibility 0s, opacity 0.2s linear"
            });
            $("#perfilCupomBox").css(
                {
                    "opacity": "0",
                    "transition": "visibility 0s, opacity 0.2s linear"
                });
            setTimeout(() => {
                    $("#perfilTitle").css(
                        {
                            "visibility":"hidden"
                    });
                    $("#perfilCupomBox").css(
                        {
                            "visibility": "hidden",
                            "display": "none"
                        });
                }, 200);
        }
    }, delay);
}

// FUNCOES PAGINA 'HOME'

function menuFadeOut() {
    if ($("#menuDropBG").css("visibility") === "visible") {
        $("#menuDropBG").css(
            {
                "visibility": "visible",
                "opacity":"0",
                "transition": "visibility 0s, opacity 0.2s linear;"
            });
        setTimeout(() => {
            $("#menuDropBG").css(
                {
                    "visibility": "hidden"
                });
        }, 200);
    }
};

function menuFadeIn() {
    event.stopPropagation();
    $("#menuDropBG").css(
        {
            "visibility": "visible",
            "opacity":"1",
            "transition": "visibility 0s, opacity 0.2s linear;"
        });
}


    
    $(document).ready(function(){
        $('#telefoneform, #CPFform').on('keypress', function(e) {
            var charCode = (e.which) ? e.which : e.keyCode;
            if (charCode < 48 || charCode > 57) {
                e.preventDefault();
            }
        });
    
        $('#envioarquivo').change(function(){
            var nomeArquivo = $(this).val().split('\\').pop();
            $('#nomeArquivo').text(nomeArquivo || 'Nenhum arquivo selecionado');
        });
    });
    
    function formatar(masking, docum){
        var i = docum.value.length;
        var saida = masking.substring(0,1);
        var texto = masking.substring(i);
        if (texto.substring(0,1) != saida){
            docum.value += texto.substring(0,1);
        }
    }

function cookieExists(name) {

  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    
    if (cookieName === name) {
      return true;
    }
  }

  return false;
}
