<?php

    try {
        require("conectarBD.php");

        $pdo=conectar();

        $tabela = "tblCupom";

        $idMax = $_POST["id"];
        $idCupom = rand(1, $idMax);
        $idCupomClone = $idCupom;


        $sql = "SELECT nome_cupom, valor, (SELECT nome_assoc FROM tblAssociacao WHERE ID_associacao IN (SELECT ID_associacao FROM tblCupom WHERE ID_cupom=:id)) as 'nome_associacao',tipo, imagem, descricao_cupom, desconto FROM tblCupom WHERE ID_cupom =:idClone;";
        $ponteiro = $pdo->prepare($sql);
        $ponteiro->bindValue(":id", $idCupom);
        $ponteiro->bindValue(":idClone", $idCupomClone);
        $ponteiro->execute();
        $resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultado)>0){
            foreach($resultado as $indice => $conteudo){
                $retorno = [
                     "nome_cupom" => $conteudo['nome_cupom'],
                     "valor" => $conteudo['valor'],
                     "associacao" => $conteudo['nome_associacao'],
                     "imagem" => $conteudo['imagem'],
                     "descricao" => $conteudo['descricao_cupom'],
                     "desconto" => $conteudo['desconto']
                    ];
                die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
            }
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