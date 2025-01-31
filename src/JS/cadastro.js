let parag = "";
let surname = "";
let campoVazio = 0;
let aux = 0;
let vetorBotoes = document.getElementsByClassName("botao-visibilidade");

// Mascarar JQuery
$(document).ready(function(){
    $('#CPF').mask('000.000.000-00');
});

/* Abaixo uma função que será chamado ao evento de clique nos botões de mostrar/esconder senha. Ao ser chamada, altera a imagem do ícone, simbolizando a alteração de visibilidade da senha, que ocorrerá ao clicar.  */

function mudarSenha() {
    if (aux == 0) {
        document.getElementById("senha").type = "text";
        document.getElementById("confirmSenha").type = "text";
        vetorBotoes[0].style.backgroundImage = "url('http://localhost/WEBSITE%20TCC/ajax/src/img/icons/eye-slash-solid.svg')";
        vetorBotoes[1].style.backgroundImage = "url('http://localhost/WEBSITE%20TCC/ajax/src/img/icons/eye-slash-solid.svg')";
        aux++;
    } else {
        document.getElementById("senha").type = "password";
        document.getElementById("confirmSenha").type = "password";
        vetorBotoes[0].style.backgroundImage = "url('http://localhost/WEBSITE%20TCC/ajax/src/img/icons/eye-solid.svg')";
        vetorBotoes[1].style.backgroundImage = "url('http://localhost/WEBSITE%20TCC/ajax/src/img/icons/eye-solid.svg')";
        aux--;
    }
}

function apagarEnvio() {
    let confirmApagar = confirm("Tem certeza que deseja apagar todas as informações digitadas?");
    if (confirmApagar == true) {
        $('.camposForm').val('');
    }
}

// Primeira condicional 'if' irá verificar se houve preenchimento dos campos
function enviarInfos() {
    $("#resParag").text("");
    parag = $("#resParag");
    let camposForm = document.getElementsByClassName("camposForm");
    for (classe = 0; classe < camposForm.length ; classe++) {
        if (camposForm[classe].value == "") {
            campoVazio++;
        }
    }
    if (campoVazio > 0) {
        window.alert("Favor, preencher todos os campos do formulário 'informações pessoais'.");
    } else if ($("#senha").val() != $("#confirmSenha").val()) {
        window.alert("Confirmação da senha incorreta, digite valores iguais nos campos 'senha' e 'Confirme senha'");
    } else {
        /* Se sim (para ambos os campos) e confirmação de senha correta, ajax será iniciado após variáveis armazenarem os valores contidos em cada campo */
        var nome = $('#primeiroNome').val();
        var sobrenome = $('#sobrenome').val();
        var cpf = $('#CPF').val();
        var dtNascimento = $('#dtNascimento').val();
        var telefone = $('#telefone').val();
        var email = $('#email').val();
        var senha = $('#senha').val();
        
        $.post(
            "./src/PHP/cadastro.php",
            {
                nome_user: nome,
                sobrenome_user: sobrenome,
                cpf_user: cpf,
                nascimento_user: dtNascimento,
                telefone_user: telefone,
                email_user: email,
                senha_user: senha,
            }
        )
        .done(
            function(retorno) {
                retorno = JSON.parse(retorno);
                if (retorno == "idade nao permitida") {
                    alert("usuário menor de 18 anos");
                } else {
                    window.location.replace("./index.html");
                }
            }
        )
        .fail(
            function (cod, textStatus, msg) {
                alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
            }
        )
    };
}

function corretorIdade() {
    let currentTime = new Date();
    let mes = currentTime.getMonth() + 1;
    let dia = currentTime.getDate();
    let year = currentTime.getFullYear();

    $("#dtNascimento").attr("max", year-18+"-"+mes+"-"+dia);
    $("#dtNascimento").attr("min", year-120+"-"+mes+"-"+dia);
}