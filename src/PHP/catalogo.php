<?php

    try {
        require("conectarBD.php");

        $pdo=conectar();

        $tabela = "tblCupom";

        $id = $_POST["id"];

        $sql = "SELECT nome_cupom, valor, tipo, imagem, descricao_cupom FROM ".$tabela." WHERE ID_cupom = :id;";
        $ponteiro = $pdo->prepare($sql);
        $ponteiro->bindValue(":id", $id);
        $ponteiro->execute();
        $resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultado)>0){
            foreach($resultado as $indice => $conteudo){
                $retorno = [
                     "nome_cupom" => $conteudo['nome_cupom'],
                     "valor" => $conteudo['valor'],
                     "tipo" => $conteudo['tipo'],
                     "imagem" => $conteudo['imagem'],
                     "descricao" => $conteudo['descricao_cupom']
                    ];
                die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
            }
        } else {
            $mensagem=["status" => "error", "message" => "Nenhum resgistro encontrado."];
            die(json_encode($mensagem));
        }
    }     catch(Exception $erro) {
        $retorno = $erro->getmessage();
    		   die(json_encode($retorno, 
    		      JSON_UNESCAPED_UNICODE |
    			  JSON_UNESCAPED_SLASHES));		 
    };
    
?>