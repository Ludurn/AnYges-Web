// VARIAVEIS GLOBAIS

let larguraTela;

larguraTela = screen.width * window.devicePixelRatio;

// VARIÁVEIS DE CONTROLE

let aux = false;
let aux2 = "claro";

// FUNCOES PAGINA 'HOME'

let ultimoScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    let larguraTela = window.innerWidth;
    if (window.scrollY > 50) {
      $("#cartContainer").css({
        "margin-top": "0%"
      });
    } else if (window.scrollY < 50) {
        if (larguraTela <= 800) {
            $("#cartContainer").css({
                "margin-top": "20%"
            });
        } else {
            $("#cartContainer").css({
                "margin-top": "7.5%"
            });
        }
    }

    if (larguraTela >= 800) {
        if (carrinhoAtivacao) {
            if (window.scrollY < ultimoScrollY) {
                $("#pedidoBox").css({
                    "transform": "translateY(-175%)"
                });
            } else {
                $("#pedidoBox").css({
                    "transform": "translateY(0%)"
                });
            }
        }
    }
    ultimoScrollY = window.scrollY;
});


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
    }
}

function tabDadosStyle() {
        let verifique = tabVerificar();
        let delay = "0";

        if (verifique == "cupomBox") {
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
                        "border-left":"white solid"
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

function tabCupomStyle() {
    let verifique = tabVerificar();
    let delay = "0";

    if (verifique == "infoBox") {
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
                    "border-left":"white solid"
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

// Modo dark (ou noturno)

function ativarModoDark() {
    aux = !aux;
    let botaoDark = document.getElementById("botaoDark");
    let logo = document.getElementById("logo-login");
    let header = document.getElementsByTagName("header");
    let pesquisa = document.getElementById("inputSearch");
    let lupa = document.getElementById("lupa");
    let body = document.getElementsByTagName("body");
    let produtos = document.getElementsByClassName("produtos");
    let nomeFiltros = document.getElementsByClassName("nomeFiltro");
    let cardsCarrinhoDark = document.getElementsByClassName("carrinhoCard");
    let cardsCarrinhoQtdeDark = document.getElementsByClassName("quantidade");

    if (aux == true) {
        botaoDark.innerHTML = "&#x2600;";
        logo.setAttribute("src", "./src/imgs/logoTitleBW.png");
    
        header[0].style.color = "white";
    
        pesquisa.classList.remove("inputSearchClass");
        pesquisa.classList.add("inputSearchDark");
    
        lupa.classList.remove("lupaClass");
        lupa.classList.add("lupa-darkClass");
    
        body[0].classList.add("bodyDark");

        for (i = 0; i < nomeFiltros.length; i++) {
            nomeFiltros[i].classList.add("nomeFiltroDark");
        }
    
        for (i = 0; i < produtos.length; i++) {
            produtos[i].classList.add("produtosDark");
        }

        for (loopCardsCarrinho = 0; loopCardsCarrinho < cardsCarrinhoDark.length; loopCardsCarrinho++) {
            cardsCarrinhoDark[loopCardsCarrinho].classList.add("carrinhoCardDark");
            cardsCarrinhoQtdeDark[loopCardsCarrinho].classList.add("quantidadeDark");
        }
    } else {
        botaoDark.innerHTML = "&#x1F319;";
        
        logo.setAttribute("src", "./src/imgs/logoTitle.png");
    
        header[0].style.color = "#8A3C29";
    
        pesquisa.classList.add("inputSearchClass");
        pesquisa.classList.remove("inputSearchDark");
    
        lupa.classList.add("lupaClass");
        lupa.classList.remove("lupa-darkClass");
    
        body[0].classList.remove("bodyDark");

        for (i = 0; i < nomeFiltros.length; i++) {
            nomeFiltros[i].classList.remove("nomeFiltroDark");
        }
    
        for (i = 0; i < produtos.length; i++) {
            produtos[i].classList.remove("produtosDark");
        }
    }
}

    function pagDark(){
        if(aux2=="claro"){
        for(let i=1;i<=5;i++){
            $('#colorir'+i).css({'color':'white'});
        }
        $("#form-container").css({backgroundColor:"gray"});
        for(let i=1;i<=8;i++){
            $('#form-group'+i).css({'color':'white'});
        }
        //$("#form-group").css({backgroundColor:"gray"});
        $('label').css({'color':'white'});
        $('input').css({'color':'white'});
        $('input').css({'backgroundColor':'#333'});
        $("#assunto").css({backgroundColor:"#333"});
        $("#assunto").css({color:"white"});
        $('option').css({'color':'white'});
        $('option').css({'backgroundColor':'gray'});
        $('textarea').css({'color':'white'});
        $('textarea').css({'backgroundColor':'#333'});
        $("#helpcontainer").css({backgroundColor:"gray"});
        $("#faq-section").css({backgroundColor:"gray"});
        for(let i=1;i<=6;i++){
            $('#question'+i).css({'color':'white'});
            $('#question'+i).hover(
                function(){
                    $(this).css('color','#731b1b');
                },
                function(){
                    $(this).css('color','white');
                });
            $('#answer'+i).css({'color':'#fff'});
        }
    
        aux2="escuro";
        }else{
        for(let i=1;i<=6;i++){
            $('#colorir'+i).css({'color':'#333'});
        }
        $("#form-container").css({backgroundColor:"#e5ffdb"});
        for(let i=1;i<=8;i++){
            $('#form-group'+i).css({'color':'#333'});
        }
        $('label').css({'color':'#333'});
        $('input').css({'backgroundColor':'white'});
        $('input').css({'color':'#333'});
        $("#assunto").css({backgroundColor:"lightGray"});
        $("#assunto").css({color:"#333"});
        $('option').css({'color':'black'});
        $('option').css({'backgroundColor':'white'});
        $('textarea').css({'color':'#333'});
        $('textarea').css({'backgroundColor':'white'});
        $("#helpcontainer").css({backgroundColor:"#e5ffdb"});
        $("#faq-section").css({backgroundColor:"#e5ffdb"});
        for(let i=1;i<=6;i++){
            $('#question'+i).css({'color':'#333'});
            $('#question'+i).hover(
                function(){
                    $(this).css('color','#28A745');
                },
                function(){
                    $(this).css('color','#333');
                });
            $('#answer'+i).css({'color':'#333'});
        }
        aux2="claro";
        }
    }

function modoDarkPerfil() {
    aux = !aux;
    let botaoDark = $("#botaoDark");
    let logo = $("#logo-login");
    let header = document.getElementsByTagName("header");
    let pesquisa = $("#inputSearch");
    let body = $("body");
    let popUp = $("#popUp");
    let perfilInfoBox = $("#perfilInfoBox");
    let perfilCupomBox = $("#perfilCupomBox");
    let btnsEdicaoPerfil = $(".btnsEdicaoPerfil");

    if (aux == true) {
        botaoDark.innerHTML = "&#x2600;";
        logo.attr("src", "./src/imgs/logoTitleBW.png");
    
        header[0].style.color = "white";
    
        pesquisa.removeClass("inputSearchClass");
        pesquisa.addClass("inputSearchDark");
    
        body[0].classList.add("bodyDark");

        popUp.css({'color':'black'});

        perfilInfoBox.css({'border':'0.2rem solid #9e9fa0'});
        perfilCupomBox.css({'border':'0.2rem solid #9e9fa0'});

        btnsEdicaoPerfil.css({'color':'white'});

    } else {
        botaoDark.innerHTML = "&#x1F319;";
        
        logo.attr("src", "./src/imgs/logoTitle.png");
    
        header[0].style.color = "#8A3C29";
    
        pesquisa.addClass("inputSearchClass");
        pesquisa.removeClass("inputSearchDark");
        
    
        body[0].classList.remove("bodyDark");

        perfilInfoBox.css({'border':'0.2rem solid #f1f1f1'});
        perfilCupomBox.css({'border':'0.2rem solid #f1f1f1'});

        btnsEdicaoPerfil.css({'color':'black'});
    }
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
