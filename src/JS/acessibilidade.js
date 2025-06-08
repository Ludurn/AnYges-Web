
$(document).ready(function () {
    const btn_middle = $("#btnAcessibilidade");
    btn_middle.on('click', exibirPainel);

    verificarModos();
});

function verificarModos() {

    if (cookieExists("modo-contrast")) {
        ativarModo("contrast");
    } else if (cookieExists("modo-deutera")) {
        ativarModo("deutera");
    } else if (cookieExists("modo-prota")) {
        ativarModo("prota");
    } else if (cookieExists("modo-trita")) {
        ativarModo("trita");
    }
}

function exibirPainel() {

    let painel =
        "<div id='painel'>"
        +"<div id='painel-header'>"
        +"<h1>Recursos de Acessibilidade</h1>"
        +"<div id='painel-closer'></div>"
        +"</div>"
        +"<div class='opcoes-painel'>"
        +"<div>"
        +"<p>Alto Constraste</p>"
        +"<input type='checkbox' id='chck-contrast' class='toggle' />"
        +"<label for='chck-contrast' id='btn-contrast' class='btn-fundo'>"
        +"<div class='bola'></div>"
        +"</label>"
        +"</div>"
        +"<div>"
        +"<p>Deuteranopia</p>"
        +"<input type='checkbox' id='chck-deutera' class='toggle' />"
        +"<label for='chck-deutera' id='btn-deutera' class='btn-fundo'>"
        +"<div class='bola'></div>"
        +"</label>"
        +"</div>"
        +"<div>"
        +"<p>Protanopia</p>"
        +"<input type='checkbox' id='chck-prota' class='toggle' />"
        +"<label for='chck-prota' id='btn-prota' class='btn-fundo'>"
        +"<div class='bola'></div>"
        +"</label>"
        +"</div>"
        +"<div>"
        +"<p>Tritanopia</p>"
        +"<input type='checkbox' id='chck-trita' class='toggle' />"
        +"<label for='chck-trita' id='btn-trita' class='btn-fundo'>"
        +"<div class='bola'></div>"
        +"</label>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</div>"
    ;

    $("body").append(painel);
    if (cookieExists("modo-contrast")) {
        $("#chck-contrast").prop('checked', true);
    } else if (cookieExists("modo-deutera")) {
        $("#chck-deutera").prop('checked', true);
    } else if (cookieExists("modo-prota")) {
        $("#chck-prota").prop('checked', true);
    } else if (cookieExists("modo-trita")) {
        $("#chck-trita").prop('checked', true);
    }

    $("#painel").css({
        "display": "flex"
    });
    setTimeout(() => {
        $("#painel").css({
            "opacity": 1
        });
    }, 100);
    
    
    const btn_contraste = $('#btn-contrast');
    btn_contraste.on('click', modoCor.bind(null, "contrast"));
    
    const btn_deutera = $('#btn-deutera');
    btn_deutera.on('click', modoCor.bind(null, "deutera"));

    const btn_prota = $('#btn-prota');
    btn_prota.on('click', modoCor.bind(null, "prota"));

    const btn_trita = $('#btn-trita');
    btn_trita.on('click', modoCor.bind(null, "trita"));

    const btn_close = $("#painel-closer");
    btn_close.on('click', fecharPainel);
}

function modoCor(tipo) {

    if (!$("#chck-"+tipo).prop('checked')) {
        desativarTodosModos();
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        ativarModo(tipo);
        document.cookie = "modo-"+tipo+"=ativo; expires="+date.toUTCString()+"; path=/";

    } else {
        desativarModo(tipo);
        document.cookie = "modo-"+tipo+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    }
}

function ativarModo(tipo) {

    $("body").addClass(tipo);
    $("#logo-login").prop("src", "./src/imgs/logoTitleBW.png");

    if ($(document).find('#logo-img').is('*')) {
        $("#logo-img").prop("src", "./src/imgs/logo-login-dark.png");
    }
}

function desativarModo(tipo) {

    $("body").removeClass(tipo);
    $("#logo-login").prop("src", "./src/imgs/logoTitle.png");

    if ($(document).find('#logo-img').is('*')) {
        $("#logo-img").prop("src", "./src/imgs/logo-login.png");
    }
}

function desativarTodosModos() {

    $("#chck-contrast").prop('checked', false);
    $("#chck-deutera").prop('checked', false);
    $("#chck-prota").prop('checked', false);
    $("#chck-trita").prop('checked', false);
    
    $("body").removeClass("contrast");
    $("body").removeClass("deutera");
    $("body").removeClass("prota");
    $("body").removeClass("trita");

    document.cookie = "modo-contrast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "modo-deutera=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "modo-prota=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "modo-trita=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    $("#logo-login").prop("src", "./src/imgs/logoTitle.png")

    if ($(document).find('#logo-img').is('*')) {
        $("#logo-img").prop("src", "./src/imgs/logo-login.png");
    }
}

function fecharPainel() {

    $("#painel").css({
        "opacity": 0
        
    });
    setTimeout(() => {
        $("#painel").css({
            "display": "none"
        });
        $("#painel").remove();
    }, 1000);
}