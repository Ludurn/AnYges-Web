<?php
    
    try {
            require("conectarBD.php");
    
            $pdo=conectar();
    
            $sql = "SELECT max(ID_cupom) as 'idMax' FROM tblCupom;";
            $ponteiro = $pdo->prepare($sql);
            $ponteiro->execute();
            $resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);
            if (count($resultado)>0){
                foreach($resultado as $indice => $conteudo){
                    $retorno = $conteudo["idMax"];
                    }
                }
            die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

    } catch(Exception $erro) {
            $retorno = $erro->getmessage();
            die(json_encode($retorno));		 
    };
?>