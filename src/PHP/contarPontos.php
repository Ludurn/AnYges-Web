<?php

        require("conectarBD.php");

        $pdo=conectar();

        session_start();

        //$usuario = $_SESSION['usuario'];
        $usuario = "daniel@hotmail.com";

        $exec0 = $pdo->prepare("SELECT ID_usuario FROM tblUsuario WHERE email_usuario = :usuario");
        $exec0->bindValue(":usuario", $usuario);
        $exec0->execute();
        $idUser = $exec0->fetchAll(PDO::FETCH_COLUMN);
        $idUser = array_sum($idUser);
        //die(json_encode($idUser, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));


        $exec1 = $pdo->prepare("SELECT SUM(pontuacao) as 'pontuacao doacao' FROM tblDoacao WHERE ID_usuario IN (SELECT ID_usuario FROM tblUsuario WHERE ID_usuario = :idUser);");
        $exec1->bindValue(":idUser", $idUser);
        $exec1->execute();
        $pntGanho = $exec1->fetchAll(PDO::FETCH_COLUMN);
        //die(json_encode($pntGanho, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));


        $exec2 = $pdo->prepare("SELECT c.valor*sq.qtd_ocorrencias as 'valor' FROM (SELECT ID_cupom, COUNT(*) AS qtd_ocorrencias FROM tblResgate WHERE ID_pedido IN (SELECT ID_pedido FROM tblPedido WHERE ID_usuario = :idUser) GROUP BY ID_cupom) AS sq INNER JOIN tblCupom AS c ON sq.ID_cupom = c.ID_cupom;");
        $exec2->bindValue(":idUser", $idUser);
        $exec2->execute();
        $valorCupom = $exec2->fetchAll(PDO::FETCH_COLUMN);
        //die(json_encode($valorCupom, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        $pntGasto = array_sum($valorCupom);
        $pntGanho = array_sum($pntGanho);
        //die(json_encode($pntGasto, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        $pontuacao = $pntGanho - $pntGasto;
        die(json_encode($pontuacao, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

?>