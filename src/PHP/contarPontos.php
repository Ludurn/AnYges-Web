<?php

        require("conectarBD.php");

        $pdo=conectar();

        session_start();

        $usuario = $_SESSION['usuario'];

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


        $exec2 = $pdo->prepare("SELECT valor FROM tblCupom WHERE ID_cupom IN (SELECT ID_cupom FROM tblResgate WHERE ID_pedido IN (SELECT ID_pedido FROM tblPedido WHERE ID_usuario = :idUser));");
        $exec2->bindValue(":idUser", $idUser);
        $exec2->execute();
        $valorCupom = $exec2->fetchAll(PDO::FETCH_COLUMN);
        //die(json_encode($valorCupom, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        $exec3 = $pdo->prepare("SELECT qtde_resgate FROM tblResgate WHERE ID_cupom IN (SELECT ID_cupom FROM tblResgate WHERE ID_pedido IN (SELECT ID_pedido FROM tblPedido WHERE ID_usuario = :idUser));");
        $exec3->bindValue(":idUser", $idUser);
        $exec3->execute();
        $qtdeCupom = $exec3->fetchAll(PDO::FETCH_COLUMN);
        //die(json_encode($qtdeCupom, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        if (count($valorCupom)>0) {
            for ($i=0; $i<count($valorCupom); $i++) {
                $pntGasto[$i] = $valorCupom[$i]*$qtdeCupom[$i];
            }
            $pntGasto = array_sum($pntGasto);
        } else {
            $pntGasto = 0;
        }
        $pntGanho = array_sum($pntGanho);
        //die(json_encode($pntGasto, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        $pontuacao = $pntGanho - $pntGasto;
        die(json_encode($pontuacao, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

?>