function acessarPerfil() {
    $.post(
        "./src/PHP/session.php",
        {
            funcao: "acessarPerfil"
        }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            let conexao = retorno;
            if (conexao['status'] == "conectado") {
                window.location.replace("./perfil.html");
            } else {
                window.location.replace("./index.html");
            }
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );
}

function desconectarPerfil(ativar) {
    if (ativar == "sim" || confirm("Deseja desconectar-se?") == true) {
        $.post(
            "./src/PHP/logout.php",
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);
                if (retorno == "desconectado") {
                    window.location.replace("./index.html");
                }
            }
        )
        .fail (
            function (cod, textStatus, msg) {
                alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
            }
        )
    }
}

function contabilizarPontos() {
    $.post(
        "./src/PHP/contarPontos.php",
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            let pontuacao = retorno;
            $("nav .menuDrop").after("<div id='pontosUser'>"+pontuacao+" ₯</div>");
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );
}

function exibirPontos() {
    $.post(
        "./src/PHP/session.php",
        {
            funcao: "exibirPontos"
        }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);

            let conexao = retorno;

            if (conexao['status'] == "conectado") {
                $("nav > #btnLogin").remove();
                $("nav > #btnCadastro").remove();
                contabilizarPontos();
            }
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );

}



