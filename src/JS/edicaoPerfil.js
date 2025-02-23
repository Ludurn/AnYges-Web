let dadosAntigos = [];

function verificarLogin(funcao) {
    $.post(
        "./src/PHP/session.php",
        {
            funcao: funcao
        }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);
            let conexao = retorno;
            if (conexao['status'] == "conectado") {
                if (conexao['funcao'] == "editar") {
                    editarDados();
                } else if (conexao['funcao'] == "excluir") {
                    alert("excluir")
                }
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

// Mascarar JQuery

function analisarTellMask(){
    let tell = $('#infoTel').val();
    if (tell.length < 15) {
        $('#infoTel').mask('(00) 00000-0000');
    }
}

function corrigirTellMask(){
    let tell = $('#infoTel').val();
    if (tell.length < 15) {
        $('#infoTel').mask('(00) 0000-0000');
    }
};

function corretorIdade() {
    let currentTime = new Date();
    let mes = currentTime.getMonth() + 1;
    let dia = currentTime.getDate();
    let year = currentTime.getFullYear();

    $("#infoNasc").attr("max", year-18+"-"+mes+"-"+dia);
    $("#infoNasc").attr("min", year-120+"-"+mes+"-"+dia);
}

//

function editarDados() {

    let infoNomeAntigo = $('#infoNome').text();
    let infoSobrenomeAntigo = $('#infoSobrenome').text();
    let infoCPFAntigo = $('#infoCPF').text();
    let infoEmailAntigo = $('#infoEmail').text();
    let infoDtAntigo = $('#infoNasc').text();
    let infoTelefoneAntigo = $('#infoTel').text();

    $('#infoNome').replaceWith("<input id='infoNome' type='text' value='"+infoNomeAntigo+"' placeholder='"+infoNomeAntigo+"'>");
    $('#infoSobrenome').replaceWith("<input id='infoSobrenome' type='text' value='"+infoSobrenomeAntigo+"' placeholder='"+infoSobrenomeAntigo+"'>");
    $('#infoCPF').replaceWith("<input id='infoCPF' type='text' value='"+infoCPFAntigo+"' placeholder='"+infoCPFAntigo+"'>");
    $('#infoEmail').replaceWith("<input id='infoEmail' type='email' value='"+infoEmailAntigo+"' placeholder='"+infoEmailAntigo+"'>");
    $('#infoNasc').replaceWith("<input id='infoNasc' type='date' value='"+infoDtAntigo+"' placeholder='"+infoDtAntigo+"'>");
    $('#infoTel').replaceWith("<input id='infoTel' type='text' value='"+infoTelefoneAntigo+"' placeholder='"+infoTelefoneAntigo+"' onclick='analisarTellMask();' onblur='corrigirTellMask();'>");

    $('#infoCPF').mask('000.000.000-00');
    $('#infoTel').mask('(00) 00000-0000');
    corretorIdade();

    dadosAntigos = {
        "infoNome": [infoNomeAntigo],
        "infoSobrenome": [infoSobrenomeAntigo],
        "infoCPF": [infoCPFAntigo],
        "infoEmail": [infoEmailAntigo],
        "infoDt": [infoDtAntigo],
        "infoTelefone": [infoTelefoneAntigo]
    };

    $('#btnEditarPerfil').text("CONFIRMAR");
    $('#btnEditarPerfil').attr('onclick', 'confirmarDados();');
}

function verificarVazio(variavel, nomeVariavel) {
    if (variavel == "") {
        let corrigido = dadosAntigos[nomeVariavel]+"";
        return corrigido;
    } else {
        return variavel;   
    }
}

function confirmarDados() {

    let infoNome = $('#infoNome').val();
    let infoSobrenome = $('#infoSobrenome').val();
    let infoCPF = $('#infoCPF').val();
    let infoEmail = $('#infoEmail').val();
    let infoDt = $('#infoNasc').val();
    let infoTelefone = $('#infoTel').val();

    infoNome = verificarVazio(infoNome, "infoNome");
    infoSobrenome = verificarVazio(infoSobrenome, "infoSobrenome");
    infoCPF = verificarVazio(infoCPF, "infoCPF");
    infoEmail = verificarVazio(infoEmail, "infoEmail");
    infoDt = verificarVazio(infoDt, "infoDt");
    infoTelefone = verificarVazio(infoTelefone, "infoTelefone");


    if(confirm("Confirmar alterações?") == true) {
        $.post(
            "./src/PHP/edicaoPerfil.php",
            {
                nome: infoNome,
                sobrenome: infoSobrenome,
                cpf: infoCPF,
                email: infoEmail,
                dt: infoDt,
                tel: infoTelefone,
                funcao: "editar"
            }
        )
        .done(
            function (retorno) {
                retorno = JSON.parse(retorno);
                if (retorno == "sucesso") {
                    desconectarPerfil();
                } else {
                    alert(retorno);
                }
            }
        )
        .fail (
            function (cod, textStatus, msg) {
                alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
            }
        );
    } else {

    }
}



function desconectarPerfil() {
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