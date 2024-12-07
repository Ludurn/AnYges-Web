<?php
    include('conexaoBD.php');
    if ($_POST) {

        $tabela = "tblProduto";

        $sql = $pdo->prepare("SELECT nome_produto, valor, tipo, imagem, descricao_produto FROM ".$tabela."WHERE status = 'S'");
        $sql->execute();

        $resultado = $sql;
        die(json_encode($resultado));
        /*if (count($resultado) > 0) {
            foreach($resultado as $indice => $conteudo){
                $resultado = $.conteudo["imagem"];
                $resultado = $.conteudo["nome_produto"];
                $resultado = $.conteudo["tipo"];
                $resultado = $.conteudo["descricao_produto"];
                $resultado = $.conteudo["valor"];
            }
            die(json_encode($resultado));*/
        } else {
            $mensagem=["status" => "error", "message" => "Nenhum resgistro encontrado."];
            die(json_encode($mensagem));
        }
?>