/* 
    Versão estendida da requisição Ajax sem o tratamento do objeto JSON
*/

$.ajax(
    {
        url : 'cadastro.php',
        type: 'post',
        data: {
            nomeCompleto : nome,
            cpf : cpf,
            estado : estado,
            cidade: cidade,
            bairro: bairro,
            email: email,
            senha: senha
        },
        datatype: 'json',
        success: function(retorno) {
            /* 'sub' irá criar uma substring sem o primeiro e último valores dos índices indicados nos parênteses, neste caso, removerá as aspas duplas recebidos por 'retorno' */
            let sub = retorno.slice(1, -1);
            /* 'dados' irá receber o conteúdo de 'sub' (que é igual a 'retorno', mas sem as aspas), e irá criar substrings separadas pelas vírgulas contidas no conteúdo de 'sub'. O resultado deste método retorna um array, que será armazenado na variável 'dados' */
            let dados = sub.split(",");
            /* 'lista' recupera o elemento de ID 'resParag' + estilização */
            let lista = window.document.getElementById("resParag");
            $("#res").css(
                {
                    marginTop: "10px",
                    borderWidth: "3px",
                    paddingLeft: "5%"
                }
            )
            /* Início de um vetor 'campos' que irá conter os valores abaixo */
            let campos = ["Nome", "CPF", "UF", "Cidade", "Bairro", "Email", "Senha"];
            /* Este laço de repetição irá percorrer os elementos contidos no vetor 'dados' */
            for (contadora = 0; contadora < dados.length; contadora++) {
                /* Se a variável declarada pelo 'for' estiver valendo 0 (ou seja, o primeiro ciclo do laço de reptição), então a variável 'completo' receberá o primeiro elemento do vetor 'dados' e irá criar substrings a partir do separador ' '(espaços brancos) contidos no vetor */
                if (contadora == 0) {
                    let completo = dados[0].split(" ");
                    /* Inserir no HTML do elemento de ID 'resParag' o nome completo enviado */
                    lista.innerHTML += "<li> Campo <strong>" + campos[0] + "</strong>: " + dados[0].slice(1, -1) + ";</li>";
                    /* Inserir no HTML do elemento de ID 'resParag' o primeiro nome enviado */
                    lista.innerHTML += "<li><strong> Primeiro Nome:</strong> " + completo[0].slice(1) + ";</li>";
                    /* O laço de repetição abaixo (que só acontecerá se a variável completo, que contém o nome completo) tiver um único valor, vai adicionar na variável 'surname' cada um dos elementos contidos na variável 'completo', a partir do segundo item 'completo[1], até atingir o último item contido em 'completo' */
                    if (completo.length > 1) {
                        for (addSobrenome = 1; addSobrenome < completo.length; addSobrenome++) {
                            surname +=  " " + completo[addSobrenome];
                        }
                        /* Por fim, adiciona ao HTML do elemento 'resParag' todos os sobrenomes enviados */
                        lista.innerHTML += "<li> <strong> Sobrenome</strong>: " + surname.slice(0, -1) + ";</li>";
                    }
                } else {
                    lista.innerHTML += "<li> Campo <strong>" + campos[contadora] + "</strong>: " + dados[contadora].slice(1, -1) + ";</li>";
                }
            }
            lista.innerHTML += "<br><br>Confirma estas informações?<br><br>";
            /* 
                Criação de botão para confirmação das informações sendo mostradas em tela
            */
            let botaoConfirma = window.document.createElement("input"); 
            botaoConfirma.setAttribute("id","btnConfirma");
            botaoConfirma.setAttribute("type","button");
            botaoConfirma.setAttribute("value","CONFIRMAR");
            /* ESTILIZAÇÃO DO BOTÃO */
            botaoConfirma.setAttribute("class","botoes");
            document.getElementById("res").appendChild(botaoConfirma);
            botaoConfirma.addEventListener("click", confirmacaoEnvio);
        },
        error: function(cod, status, msg) {
            alert("Erro na comunicação com o servidor:\nError Log:\n" + cod + "\n" + status + "\n" + msg);
        },
        complete: function() {
            alert("Informações enviadas com êxito!");
        }
    }
);
