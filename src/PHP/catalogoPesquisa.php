<?php


        require("conectarBD.php");

        $pdo=conectar();


        $pesquisa = $_POST['pesquisa'];


    try {
            $sql = "SELECT TOP 24 c.ID_cupom, c.nome_cupom, a.nome_assoc AS 'nome_associacao', c.valor, c.tipo, c.imagem, c.descricao_cupom, c.desconto FROM tblCupom c INNER JOIN tblAssociacao a ON c.ID_associacao = a.ID_associacao WHERE nome_cupom LIKE '%".$pesquisa."%' OR nome_assoc LIKE '%".$pesquisa."%' OR descricao_cupom LIKE '%".$pesquisa."%'  ORDER BY NEWID();";
            $ponteiro = $pdo->prepare($sql);
            $ponteiro->execute();
            $cupom = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

            if (count($cupom)>0){
                die(json_encode($cupom, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
            } else {
                $mensagem="sem registro";
                die(json_encode($mensagem));
            }
        } catch(Exception $erro) {
        $retorno = $erro->getmessage();
    		   die(json_encode($retorno, 
    		      JSON_UNESCAPED_UNICODE |
    			  JSON_UNESCAPED_SLASHES));		 
    };
    
?>