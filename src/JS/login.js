
$(document).ready(function(){
    

    $('#btnEntrar').click( function() {
     
        const usuario = $('#usuario').val();
        const senha = $('#senha').val();

        if (!usuario || !senha) {
            alert('Todos os campos devem ser preenchidos');
        } else {
            $.post(
                "./src/PHP/login.php",
                //variáveis a serem enviadas para o arquivo acima
                {
                    usuario_email: usuario,
                    usuario_senha: senha
                }
            )
            .done(
                function (retorno) {
                    retorno = JSON.parse(retorno);
                    if (retorno == "prosseguir") {
                        window.location.replace("./home.html");
                    } else {
                        alert("Email e/ou senha incorretos.");
                    }
                }
            )
            .fail (
                function (cod, textStatus, msg) {
                    alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
                }
            )
        }
    });
});
