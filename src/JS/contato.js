let campoVazio = 0;

$(document).ready(function(){
    $('#CPFform').mask('000.000.000-00');
    $('#telefoneform').mask('(00) 00000-0000');
});

function analisarTellMask(){
    let tell = $('#telefoneform').val();
    if (tell.length < 15) {
        $('#telefoneform').mask('(00) 00000-0000');
    }
}

function corrigirTellMask(){
    let tell = $('#telefoneform').val();
    if (tell.length < 15) {
        $('#telefoneform').mask('(00) 0000-0000');
    }
};


function enviarForm(){
    /*let camposForm = document.getElementsByClassName("camposForm");
    for (classe = 0; classe < camposForm.length ; classe++) {
        if (camposForm[classe].value == "") {
            campoVazio++;
        }
    }

    if (campoVazio > 0) {
        window.alert("Favor, preencher todos os campos necessários do formulário.");
    }
    else{*/
        var nomeF = $('#nomeform').val();
        var telF = $('#telefoneform').val();
        var cpfF = $('#CPFform').val();
        var emailF = $('#emailform').val();
        var assuntoF = $('#assuntoform').val();
        var mensagemF = $('#mensagemform').val();
        var anexoF = $('#envioanexo').val();
        $.post(
            "./src/PHP/contato.php",
            {
                nome: nomeF,
                telefone: telF,
                cpf: cpfF,
                email: emailF,
                assunto: assuntoF,
                descricao_feedback: mensagemF,
                anexo: anexoF,
            }
        )
        .done(
            function(retorno){
                retorno = JSON.parse(retorno);
                if(retorno == "Erro no envio"){
                    alert("Erro ao enviar o formulário, tente novamente mais tarde");
                }else if(retorno == "Formulário enviado"){
                    alert("Formulário enviado com sucesso");
                }
            }
        )
        .fail(
            function(cod, textStatus, msg){
                alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
            }
        )
    //};
}