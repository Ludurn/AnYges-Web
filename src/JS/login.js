$(document).ready(function(){
    

    $('#btnEntrar').click( function() {
     
        const usuario = $('#usuario').val();
        const senha = $('#senha').val();

        if (!usuario || !senha) {
            alert('Todos os campos devem ser preenchidos');
        }

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
                alert(
                    "Nome = " + retorno["nome"] + "\n" +
                    "Sobrenome = " + retorno["sobrenome"] + "\n" +
                    "Cpf = " + retorno["cpf"] + "\n" +
                    "Telefone = " + retorno["telefone"] + "\n" +
                    "Rua = " + retorno["rua"] + "\n" +
                    "Numero = " + retorno["numero"] + "\n" +
                    "Bairro = " + retorno["bairro"] + "\n" +
                    "Cidade = " + retorno["cidade"] + "\n" +
                    "Estado = " + retorno["estado"]
                );
            }
        )
        .fail (
            function (cod, textStatus, msg) {
                alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
            }
        )
        .always(
            alert("Operação de login concluída!")
        )
    });
});