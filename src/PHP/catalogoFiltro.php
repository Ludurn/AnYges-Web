<?php

    try {
        require("conectarBD.php");

        $pdo=conectar();
        
        $filtro = $_POST["filtro"];
        
        $sql = "SELECT TOP 25 c.ID_cupom, c.nome_cupom, a.nome_assoc AS 'nome_associacao', c.valor, c.tipo, c.imagem, c.descricao_cupom, c.desconto FROM tblCupom c INNER JOIN tblAssociacao a ON c.ID_associacao = a.ID_associacao WHERE tipo = :filtro ORDER BY NEWID();";
        $ponteiro = $pdo->prepare($sql);
        $ponteiro->bindValue(":filtro", $filtro);
        $ponteiro->execute();
        $cupom = $ponteiro->fetchAll(PDO::FETCH_ASSOC);
          

        if (count($cupom)>0) {
            die(json_encode($cupom, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        } else {
            $mensagem=["status" => "error", "message" => "sem registro"];
            die(json_encode($mensagem));
        }
    }     catch(Exception $erro) {
        $retorno = $erro->getmessage();
    		   die(json_encode($retorno, 
    		      JSON_UNESCAPED_UNICODE |
    			  JSON_UNESCAPED_SLASHES));		 
    };
?>