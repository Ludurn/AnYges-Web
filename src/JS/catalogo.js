let vezes=0;
let fileira=1;
let id=1;

function carregarCatalogo(fileira) {

    $.post(
        "./src/PHP/catalogo.php",
        {
            id: id
        }
    )
    .done(
        function (retorno) {
            retorno = JSON.parse(retorno);

            $("#fileira-"+fileira).append(
                "<article class='produtos'>"
                +"<div class='molduraProdutos'>"
                +"<figure>"
                +"<img src='"+retorno['imagem']+"' id='imgProduto' class='imgProdutos' alt='rivotril em gotas' width='100%' />"
                +"</figure>"
                +"</div>"
                 +"<p id='nomeProduto'>"+retorno['nome_cupom']+"</p>"
                 +"<h4 id='fornecedorProduto'>"+retorno['tipo']+"</h4>"
                 +"<p id='descricaoProduto' class='descricaoProdutos'>"+retorno['descricao']+"</p>"
                 +"<div id='btnProduto' class='btnProdutos'>"+retorno['valor']+" ₯</div>"
                 +"</article>"
            );

            vezes++;
            id++;

            if (vezes <= 2) {
                carregarCatalogo(1);
            } else if (vezes <= 5) {
                carregarCatalogo(2);
            }

        }
    )
    .fail (
        function (cod, textStatus, msg) {
            alert("Erro!\nCódigo: " + cod + "\n\nStatus: " + textStatus + "\n\nMensagem: " + msg);
        }
    );





}
