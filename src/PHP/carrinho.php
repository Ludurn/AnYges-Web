<?php

    try {
        require("conectarBD.php");

        $pdo=conectar();

        $idCards = $_POST['idCards'];
        
        $sql = "SELECT c.ID_cupom, c.nome_cupom, c.valor, c.imagem, c.desconto FROM tblCupom c WHERE c.ID_cupom IN ($idCards);";
        $ponteiro = $pdo->prepare($sql);
        $ponteiro->execute();
        $cards = $ponteiro->fetchAll(PDO::FETCH_ASSOC);
          
        if (count($cards)>0) {
            die(json_encode($cards, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
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