let modoDark = document.getElementById("icone-modo-dark");
let aux = 0;

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

function ativarModoDark() {
    //DECLARAÇÃO DE VARIÁVEIS

    let corpoDark = document.getElementsByTagName("body");
    
    let container = document.getElementsByClassName("login-container");

    let iconeTrocaModo = document.getElementById("icone-modo-dark");

    let btnDark = document.getElementsByClassName("btn-login");

    let logo = document.getElementById("logo-login");

    let labelDark = document.getElementsByClassName("input-group");
    
    let camposDark = document.getElementsByClassName("camposForm");

    //ALTERAÇÃO DAS CLASSES PARA HERDAREM PROPRIEDADES DO MODO DARK
 
    corpoDark[0].classList.add("body-dark");
    
    container[0].classList.add("login-container-dark");

    iconeTrocaModo.innerHTML = "&#x2600;";
    iconeTrocaModo.style.color = "white";

    logo.setAttribute("src", "./src/imgs/logo-login-dark.png");

    for (i = 0; i < 2; i++) {
        btnDark[i].classList.add("btn-login-dark");
        camposDark[i].classList.add("camposForm-dark");
        labelDark[i].classList.add("input-group-dark");
    }

    //VARIÁVEL AUXILIAR DE CONTROLE 

    aux++;
    if (aux > 1) {
        aux = 0;

        corpoDark[0].classList.remove("body-dark");

        container[0].classList.remove("login-container-dark");

        iconeTrocaModo.innerHTML = "&#x1F319;";

        logo.setAttribute("src", "./src/imgs/logo-login.png");

        for (i = 0; i < 2; i++) {
            btnDark[i].classList.remove("btn-login-dark");
            camposDark[i].classList.remove("camposForm-dark");
            labelDark[i].classList.remove("input-group-dark");
        }
    }
}