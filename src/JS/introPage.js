

$(document).ready(function () {
    const btn_middle = $("#btn-middle");
    btn_middle.on('click', encaminharBloco2);

    const btn_solicitacao = $("#btn-solicitacao");
    btn_solicitacao.on('click', popUp);

});


function encaminharBloco2() {
    const position = $("#bloco-2").offset().top + 10;
    $('html, body').animate({
        scrollTop: position
    }, 500);
    setTimeout(() => {
        $(".middle-text").css({
            "opacity": 1
        });
    }, 1000);
}

function popUp() {
    let popUp =
        "<div id='popUp'>"
        +"<div id='popUp-header'>"
        +"<h1>Selecione uma das opções</h1>"
        +"<div id='popUp-closer'></div>"
        +"</div>"
        +"<p>Para solicitar sua integração escolha o perfil que melhor representa sua instituição:</p>"
        +"<div id='btns-box'>"
        +"<div id='btn-assoc'>Associação</div>"
        +"<div id='btn-centro'>Centro de Tratamento</div>"
        +"</div>"
        +"<p id='help-text'>Associação: Organizações que atuam na conscientização e promoção de boas práticas socioambientais, contribuindo para uma rede colaborativa de gestão de resíduos.</p>"
        +"</div>"
    ;
    $("body").append(popUp);
    $("#popUp").css({
        "display": "flex"
    });
    setTimeout(() => {
        $("#popUp").css({
            "opacity": 1
        });
    }, 100);
    
    const btn_assoc = $("#btn-assoc");
    btn_assoc.on('click', redirecionar);
    btn_assoc.mouseenter(function() {
        $("#help-text").text("Associação: Organizações que atuam na conscientização e promoção de boas práticas socioambientais, contribuindo para uma rede colaborativa de gestão de resíduos.");
        $("#help-text").css({ "opacity": 1 });
    });
    btn_assoc.mouseleave(function() {
        $("#help-text").css({ "opacity": 0 });
    });

    const btn_centro = $("#btn-centro");
    btn_centro.on('click', redirecionar);
    btn_centro.mouseenter(function() {
        $("#help-text").text("Centro de Tratamento: Estabelecimentos especializados na coleta, triagem e tratamento de resíduos, comprometidos com práticas sustentáveis e a inovação ambiental.");
        $("#help-text").css({ "opacity": 1 });
    });
    btn_centro.mouseleave(function() {
        $("#help-text").css({ "opacity": 0 });
    });

    const btn_close = $("#popUp-closer");
    btn_close.on('click', fecharPopUp);
}

function redirecionar() {
    let btnText = $(this).text();

    if(btnText == "Associação") {
        window.location.replace("./solicitacao_empresa.php?t=associacao");
    } else if (btnText == "Centro de Tratamento") {
        window.location.replace("./solicitacao_empresa.php?t=centro_tratamento");
    }
}

function fecharPopUp() {

    $("#popUp").css({
        "opacity": 0
        
    });
    setTimeout(() => {
        $("#popUp").css({
            "display": "none"
        });
        $("#popUp").remove();
    }, 1000);
}
