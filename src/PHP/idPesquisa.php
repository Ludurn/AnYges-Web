<?php


        require("conectarBD.php");

        $pdo=conectar();

        $pesquisa = $_POST["pesquisa"];

        $exec = $pdo->prepare("SELECT ID_cupom FROM tblCupom WHERE nome_cupom LIKE '%".$pesquisa."%' OR descricao_cupom LIKE '%".$pesquisa."%' OR ID_associacao IN (SELECT ID_associacao FROM tblAssociacao WHERE nome_assoc LIKE '%".$pesquisa."%');");
        $exec->execute();
        $resultado = $exec->fetchAll(PDO::FETCH_COLUMN);
        die(json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));


?>