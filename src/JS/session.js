function acessarPerfil() {
    $.post(
        "./src/PHP/session.php",
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            let conexao = retorno;
            if (conexao == "conectado") {
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

function desconectarPerfil() {
    if (confirm("Deseja desconectar ?") == true) {
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

function exibirPontos() {
    $.post(
        "./src/PHP/session.php",
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            let conexao = retorno;
            if (conexao == "conectado") {
                $("nav > #btnLogin").remove();
                $("nav > #btnCadastro").remove();
                $("nav .menuDrop").after("<div id='pontosUser'>10000 ₯</div>");
            }
        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );

}

